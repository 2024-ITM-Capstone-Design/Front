import CreateLayout from "../../components/Common/CreateLayout";
import tw from "twin.macro";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PlayerItem from "../../components/Common/PlayerItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLyrics, reviseLyric } from "../../api/create";
import { useParams } from "react-router-dom";
import Slider from "react-slick"; // 슬라이더 라이브러리 추가
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../../components/Common/Loader";
import NextButton from "../../components/Common/NextButton";
import { useCallback, useMemo } from "react";

function CheckLyric() {
  const navigate = useNavigate();

  const { itemId } = useParams() as { itemId: string };
  const handleNext = () => {
    navigate(`/create/analysis-result/${itemId}`);
  };

  // QueryClient 가져오기
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getLyric", itemId],
    queryFn: () => getLyrics(itemId),
  });

  if (!isLoading && data) {
    console.log(data);
  }
  // 슬라이더 설정을 useMemo로 메모이제이션
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      touchRatio: 0, // 드래그 금지
      speed: 500,
      slidesToShow: 1,
      slidesPerRow: 2,
      arrows: true,
      draggable: false,
      appendDots: (dots: any) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <ul> {dots} </ul>
        </div>
      ),
      dotsClass: "dots_custom",
    }),
    []
  );

  // PlayerItem에서 수정된 가사를 받아서 서버로 보내는 함수
  const handleLyricChange = useCallback(
    (index: number, newLyric: string) => {
      mutation.mutate({
        itemId: itemId,
        segmentOrder: index,
        newLyric: newLyric,
      });
    },
    [itemId]
  );

  const mutation = useMutation({
    mutationFn: async ({
      itemId,
      segmentOrder,
      newLyric,
    }: {
      itemId: string;
      segmentOrder: number;
      newLyric: string;
    }) => {
      await reviseLyric(itemId, segmentOrder, newLyric);
    },
    onSuccess: () => {
      // 수정이 성공적으로 완료되었을 때 queryClient.invalidateQueries로 캐시된 데이터를 다시 가져옵니다.
      queryClient.invalidateQueries({
        queryKey: ["getLyrics"],
      });
    },
    onError: () => {
      alert("Failed");
    },
  });
  if (!isLoading && data && data.segments.length > 0) {
    return (
      <CreateLayout currentStep={1}>
        <ContentWrapper>
          <label className="title-md">Lyric Segmentation & Editing</label>
          <label className="text-sm">
            These are the lyrics automatically extracted by AI at 36-second
            intervals! If there are any parts that need correction to improve
            accuracy, please feel free to edit them manually.
          </label>
          <ItemBox>
            <Slider {...settings}>
              {data.segments.map((item: any, index: number) => (
                <PlayerItem
                  key={index}
                  segmentIndex={item.segmentOrder}
                  totalDuration={data.duration}
                  audioUrl={item.segmentFileUrl}
                  text={item.segmentLyric}
                  onChange={(newText: string) =>
                    handleLyricChange(item.segmentOrder, newText)
                  }
                />
              ))}
            </Slider>
          </ItemBox>
        </ContentWrapper>
        <NextButton onClick={handleNext}>Next → </NextButton>
      </CreateLayout>
    );
  } else {
    return (
      <CreateLayout currentStep={1}>
        <ContentWrapper>
          <Loader description="We are extracting your lyrics by segment, please hold on..." />
        </ContentWrapper>
      </CreateLayout>
    );
  }
}

export default CheckLyric;

const ContentWrapper = styled.div`
  ${tw`w-full h-[619px] bg-gray [border-radius: 15px] p-7 font-display flex flex-col`}
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .title-md {
    ${tw`font-semibold text-white text-md`}
  }
  .text-sm {
    ${tw`font-light text-subGray text-sm`}
  }
`;
const ItemBox = styled.div`
  ${tw`w-[95%] max-w-[750px] mt-5 mx-auto`}
`;
