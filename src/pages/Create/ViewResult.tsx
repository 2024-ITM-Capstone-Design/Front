import tw from "twin.macro";
import styled from "styled-components";
import ImgSlider from "../../components/ViewResult/ImgSlider";
import NextButton from "../../components/Common/NextButton";
import { useNavigate, useParams } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import DownloadIcon from "../../assets/icons/download-icon";
import { useState } from "react";
import MusicPlaySection from "../../components/ViewResult/MusicPlaySection";
import { useQuery } from "@tanstack/react-query";
import { getResultData } from "../../api/create";
import CreateLayout from "../../layout/CreateLayout";

function ViewResult() {
  const navigate = useNavigate();
  const { itemId } = useParams() as { itemId: string };
  const [currentTime, setCurrentTime] = useState<number>(0); // 오디오 현재 시간 상태 추가

  // Query to fetch analysis result
  const { data, isLoading } = useQuery({
    queryKey: ["getImageOutput", itemId],
    queryFn: () => getResultData(itemId),
  });

  // 커버 이미지 다운로드를 위한 함수
  const handleCoverImageDownload = async (
    imageDownloadUrl: string[],
    audioName: string
  ) => {
    try {
      const response = await fetch(imageDownloadUrl[0], {
        headers: {
          "Cache-Control": "no-cache",
        },
      }); // 첫 번째 이미지 URL로 요청
      const blob = await response.blob(); // 응답을 Blob으로 변환

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Blob 객체를 URL로 변환
      link.download = `${audioName}-cover-image.png`; // 파일명 지정
      document.body.appendChild(link);
      link.click(); // 다운로드 트리거
      document.body.removeChild(link);

      // 메모리 정리
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Image download failed:", error);
    }
  };

  const handleSectionImagesDownload = async (
    type: string,
    imageDownloadUrl: string[],
    audioName: string
  ) => {
    // 섹션별 이미지 압축용 폴더 생성
    const zip = new JSZip();
    const imgFolder = zip.folder("section-images");

    // i 초기화 (MANY 타입이면 0부터, 아니면 1부터 시작)
    let i = 0;
    type === "MANY" ? (i = 0) : (i = 1);

    // Promise.all을 통해 비동기적으로 이미지들을 병렬 다운로드
    const imagePromises = imageDownloadUrl
      .slice(i)
      .map(async (imageUrl, index) => {
        try {
          const response = await fetch(imageUrl, {
            headers: {
              "Cache-Control": "no-cache",
            },
          });
          if (!response.ok) throw new Error(`Failed to fetch image ${index}`);
          const imageBlob = await response.blob();
          imgFolder!.file(`section-image-${index + 1}.png`, imageBlob); // 각 파일을 올바른 이름으로 추가
        } catch (error) {
          console.error(`Image ${index + 1} download failed:`, error);
        }
      });

    // 모든 이미지가 다운로드되고 zip에 추가될 때까지 기다림
    await Promise.all(imagePromises);

    // ZIP 파일 생성 및 다운로드
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${audioName}-section-images.zip`); // 파일명 지정 및 다운로드
    });
  };
  if (!isLoading && data) {
    return (
      <CreateLayout currentStep={4}>
        <ContentWrapper>
          <span className="title-md">View & Download</span>
          <span className="text-sm">
            Image generation is complete! Check out the results now.
          </span>
          <Container>
            <div className="flex flex-row gap-[25px] w-full items-center">
              {data.type === "ONE" ? (
                <ImgContainer src={data.imageDownloadUrl[0]} />
              ) : (
                <ImgSlider
                  type={data.type}
                  images={data.imageDownloadUrl}
                  currentTime={currentTime}
                />
              )}
              <MusicPlaySection
                audioDownloadUrl={data.audioDownloadUrl}
                setCurrentTime={setCurrentTime}
                duration={data.duration}
                audioName={data.audioName}
              />
            </div>
            <div className="w-full flex flex-row gap-[10px] justify-center ">
              {data.type != "MANY" && (
                <button
                  className="download-btn"
                  onClick={() =>
                    handleCoverImageDownload(
                      data.imageDownloadUrl,
                      data.audioName
                    )
                  }
                >
                  Download Cover Image
                  <DownloadIcon />
                </button>
              )}
              {data.type != "ONE" && (
                <button
                  className="download-btn"
                  onClick={() =>
                    handleSectionImagesDownload(
                      data.type,
                      data.imageDownloadUrl,
                      data.audioName
                    )
                  }
                >
                  Download Section Images
                  <DownloadIcon />
                </button>
              )}
            </div>
          </Container>
        </ContentWrapper>
        <NextButton onClick={() => navigate("/")}>Terminate →</NextButton>
      </CreateLayout>
    );
  } else {
    return <div></div>;
  }
}

export default ViewResult;
const ContentWrapper = styled.div`
  ${tw`w-full min-h-[619px] bg-gray [border-radius: 15px] p-7 font-display flex flex-col`}
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .title-md {
    ${tw`font-semibold text-white text-md`}
  }
  .text-sm {
    ${tw`font-light text-subGray text-sm`}
  }

  .download-btn {
    ${tw`max-w-[320px] w-full h-[40px] rounded-[10px] bg-none border-[1px] border-white font-display font-medium text-base text-white flex flex-row items-center justify-center gap-1 px-[30px]`}
  }
`;

const Container = styled.div`
  ${tw`flex flex-col items-center py-[50px] px-[34px] w-full min-h-[420px] rounded-[16px] mt-[30px] bg-black`}
`;

const ImgContainer = styled.img`
  ${tw`w-[290px] h-[290px] rounded-[20px] mb-5`}
`;
