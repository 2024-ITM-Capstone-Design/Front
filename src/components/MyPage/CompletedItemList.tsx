import tw from "twin.macro";
import styled from "styled-components";
import { viewCompletedMusics } from "../../api/my-page";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/useAuthStore";
import PlayIcon from "../../assets/icons/play-icon";
import StopIcon from "../../assets/icons/stop-icon";
import { useCallback, useState } from "react";
import DownloadIcon from "../../assets/icons/download-icon";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ResultData } from "../../type/result";
import PlayModal from "./PlayModal";
import NoDataIcon from "../../assets/icons/no-data-icon";
import { getResultData } from "../../api/create";
import axios from "axios";
function CompletedItemList() {
  const { userData } = useAuthStore();
  const { isLoading, data, error } = useQuery({
    queryKey: ["viewCompletedMusics"],
    queryFn: () => viewCompletedMusics(userData?.id!),
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ResultData>(); // 모달에 전달할 데이터
  const [playingIndex, setPlayingIndex] = useState<number | null>(null); // 현재 재생 중인 인덱스 저장

  const handleImageClick = async (itemId: string) => {
    //특정 아이템 이미지 생성 데이터 조회 api 요청
    const res = await getResultData(itemId);
    if (res) {
      setModalData(res);
      setIsOpen(true); // 모달 열기
    }
  };

  const handlePlay = useCallback(
    (index: number, audioUrl: string) => {
      if (playingIndex === index) {
        // 이미 재생 중인 경우 일시 정지
        const audio = document.getElementById(
          `audio-${index}`
        ) as HTMLAudioElement;
        audio.pause();
        setPlayingIndex(null);
      } else {
        // 새 오디오 재생
        if (playingIndex !== null) {
          const prevAudio = document.getElementById(
            `audio-${playingIndex}`
          ) as HTMLAudioElement;
          prevAudio.pause();
        }
        const newAudio = document.getElementById(
          `audio-${index}`
        ) as HTMLAudioElement;
        newAudio.play();
        setPlayingIndex(index);
      }
    },
    [playingIndex]
  );

  const getHashTag = (type: string) => {
    if (type === "ONE") {
      return "#cover #image";
    }
    if (type === "MANY") {
      return "#section #images";
    }
    if (type === "BOTH") {
      return "#cover #section #images";
    }
  };

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
      });
      const blob = await response.blob(); // 응답을 Blob으로 변환
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Blob 객체를 URL로 변환
      link.download = `${audioName}-cover-image.jpg`; // 파일명 지정
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
    imageDownloadUrl: string[],
    audioName: string
  ) => {
    // 섹션별 이미지 압축용 폴더 생성
    const zip = new JSZip();
    const imgFolder = zip.folder("section-images");

    // i 초기화 (MANY 타입이면 0부터, 아니면 1부터 시작)
    let i = 0;

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

  //섹션별 이미지 다운로드를 위한 함수
  const handleBothImagesDownload = async (
    imageDownloadUrl: string[],
    audioName: string
  ) => {
    // JSZip을 사용하여 섹션별 이미지를 압축
    const zip = new JSZip();
    const imgFolder = zip.folder(`${audioName}-images`);

    const imageUrl = imageDownloadUrl[0];
    const imageBlob = await fetch(imageUrl, {
      headers: {
        "Cache-Control": "no-cache",
      },
    }).then((res) => res.blob());
    imgFolder?.file(`cover-image.jpg`, imageBlob);

    let i = 1;
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

  const downloadImage = (
    type: string,
    imageDownloadUrl: string[],
    audioName: string
  ) => {
    if (type === "ONE") {
      handleCoverImageDownload(imageDownloadUrl, audioName);
    } else if (type === "MANY") {
      handleSectionImagesDownload(imageDownloadUrl, audioName);
    } else {
      handleBothImagesDownload(imageDownloadUrl, audioName);
    }
  };

  if (!isLoading && data && data.length > 0) {
    return (
      <Container>
        {data.map((item: any, index: number) => (
          <CardBox key={index}>
            <img
              className="img-container"
              src={item.imageDownloadUrl[0]}
              onClick={() => handleImageClick(item.inputDataId)}
            />
            <div className="content-container">
              <div className="flex items-center gap-[4px]">
                <button
                  className="play-btn"
                  onClick={() => handlePlay(index, item.audioDownloadUrl)}
                >
                  {playingIndex === index ? (
                    <StopIcon width={10} height={8} />
                  ) : (
                    <PlayIcon width={10} height={8} />
                  )}
                </button>
                <audio id={`audio-${index}`} src={item.audioDownloadUrl} />
                <span className="title">{item.audioName}</span>
              </div>
              <span className="hash-tag">{getHashTag(item.type)}</span>
              <div className="w-full h-[0.2px] bg-gray" />
              <div className="flex items-center gap-[4px] mx-auto">
                <button
                  className="download-btn"
                  onClick={() =>
                    downloadImage(
                      item.type,
                      item.imageDownloadUrl,
                      item.audioName
                    )
                  }
                >
                  Download
                </button>
                <DownloadIcon width={18} height={18} color={"#8D7EFD"} />
              </div>
            </div>
            {isOpen && modalData && (
              <PlayModal
                {...modalData}
                onClose={() => setIsOpen(false)} // 모달 닫기
              />
            )}
          </CardBox>
        ))}
      </Container>
    );
  } else {
    return (
      <div className="w-full flex flex-col items-center my-20">
        <NoDataIcon />
        <span className="font-display font-semibold text-lg text-subGray">
          You have not submitted music yet.
        </span>
      </div>
    );
  }
}

export default CompletedItemList;

const Container = styled.div`
  ${tw`w-full grid my-4 gap-3.5`}

  grid-template-columns: repeat(4, 1fr)
`;

const CardBox = styled.div`
  ${tw`flex flex-col w-full h-[350px]`}

  .img-container {
    ${tw`w-full h-[250px] rounded-t-[12px] bg-subColor`}
  }
  .content-container {
    ${tw`w-full bg-[linear-gradient(178.87deg, #404657 -293.27%, rgba(64, 70, 87, 0) 181.1%)] flex flex-col items-center gap-0.5 py-1.5 rounded-b-[12px]`}
    .title {
      ${tw`font-display font-medium text-md text-white`}
    }
    .play-btn {
      ${tw`w-[25px] h-[25px] rounded-full bg-mainColor flex items-center justify-center`}
    }
    .hash-tag {
      ${tw`font-light text-sm text-subGray`}
    }
    .download-btn {
      ${tw` w-[65px] font-normal text-[16px] text-subGray border-b-[1px] border-b-subGray  mb-1.5`}

      &:hover {
        ${tw`text-white border-b-white`}
      }
    }
  }
`;
