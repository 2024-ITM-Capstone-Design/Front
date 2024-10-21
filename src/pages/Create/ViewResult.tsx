import CreateLayout from "../../components/Common/CreateLayout";
import tw from "twin.macro";
import styled from "styled-components";
import ImgSlider from "../../components/ViewResult/ImgSlider";
import DummyImg from "../../assets/Dummy/dummyImg.png";
import { ReactComponent as PlayIcon } from "../../assets/play-icon.svg";
import { ReactComponent as RepeatIcon } from "../../assets/repeat-icon.svg";
import { ReactComponent as PauseIcon } from "../../assets/pause-icon.svg";
import { ReactComponent as DownloadIcon } from "../../assets/download-icon.svg";
import { useEffect, useRef, useState } from "react";
import NextButton from "../../components/Common/NextButton";
import { useLocation, useNavigate } from "react-router-dom";
import { formatTime } from "../../utils/format-time";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function ViewResult() {
  const navigate = useNavigate();

  const [play, setPlay] = useState<boolean>(false);
  const [playProgress, setPlayProgress] = useState<number>(0); // 진행 바 상태 관리
  const [isDragging, setIsDragging] = useState<boolean>(false); // 드래그 상태 관리
  const [currentTime, setCurrentTime] = useState<number>(0); // 오디오 현재 시간 상태 추가
  const progressRef = useRef<HTMLDivElement>(null); // progress bar 참조
  const location = useLocation();
  const { imageDownloadUrl, audioDownloadUrl, audioName, type, duration } =
    location.state;

  const audioRef = useRef<HTMLAudioElement>(audioDownloadUrl); // 오디오 엘리먼트를 참조

  useEffect(() => {
    if (audioRef.current) {
      const handleTimeUpdate = () => {
        const time = Math.floor(audioRef.current?.currentTime || 0);
        setCurrentTime(time);
        setPlayProgress((time / duration) * 100); // 진행 바 업데이트
      };

      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", handleTimeUpdate); // 이벤트 리스너 해제
        }
      };
    }
  }, [audioRef]);

  const handlePlay = () => {
    console.log(audioRef.current);
    if (audioRef.current) {
      if (play) {
        audioRef.current.pause(); // 오디오 중지
      } else {
        audioRef.current.play(); // 오디오 재생
      }
      setPlay(!play);
    }
  };

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateProgress(e);
  };

  // 드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateProgress(e);
    }
  };

  // 드래그 종료
  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      updateProgress(e);
      setIsDragging(false);
    }
  };

  // 진행 바 업데이트 함수
  const updateProgress = (e: React.MouseEvent) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left; // 클릭한 X 좌표 계산
      const newProgress = Math.max(0, Math.min(1, offsetX / rect.width)); // 진행 바 퍼센트 계산 (0-1 사이)
      const newCurrentTime = newProgress * duration; // 새로운 currentTime 계산
      setPlayProgress(newProgress * 100); // 진행 바 퍼센트 업데이트
      setCurrentTime(newCurrentTime); // currentTime 업데이트
      audioRef.current.currentTime = newCurrentTime; // 오디오 재생 위치 업데이트
    }
  };

  // 커버 이미지 다운로드를 위한 함수
  const handleCoverImageDownload = async () => {
    try {
      const response = await fetch(imageDownloadUrl[0]); // 첫 번째 이미지 URL로 요청
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

  //섹션별 이미지 다운로드를 위한 함수
  const handleSectionImagesDownload = async () => {
    // JSZip을 사용하여 섹션별 이미지를 압축
    const zip = new JSZip();
    const imgFolder = zip.folder("section-images");

    // 섹션별 이미지 추가 (1번째부터 마지막까지)
    for (let i = 1; i < imageDownloadUrl.length; i++) {
      const imageUrl = imageDownloadUrl[i];
      const imageBlob = await fetch(imageUrl).then((res) => res.blob());
      imgFolder?.file(`section-image-${i}.jpg`, imageBlob);
    }

    // ZIP 파일 생성 및 다운로드
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${audioName}-section-images.zip`); // 파일명 지정 및 다운로드
    });
  };

  return (
    <CreateLayout currentStep={4}>
      <ContentWrapper>
        <span className="title-md">View & Download</span>
        <span className="text-sm">
          Image generation is complete! Check out the results now.
        </span>
        <Container>
          <div className="flex flex-row gap-[25px] w-full items-center">
            {type === "ONE" ? (
              <ImgContainer src={imageDownloadUrl[0]} />
            ) : (
              <ImgSlider
                type={type}
                images={imageDownloadUrl}
                currentTime={currentTime}
              />
            )}
            <MusicPlaySection>
              <span className="song-title">{audioName}</span>
              <div className="flex flex-row gap-2">
                {play ? (
                  <PauseIcon onClick={handlePlay} />
                ) : (
                  <PlayIcon onClick={handlePlay} />
                )}
                <RepeatIcon
                  onClick={() => {
                    setCurrentTime(0);
                    audioRef.current.currentTime = 0;
                    setPlayProgress(0);
                    setPlay(true);
                    audioRef.current.play();
                  }}
                />
              </div>
              <PlayProgressContainer
                ref={progressRef}
                progress={playProgress}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setIsDragging(false)}
              >
                <div className="progress-filled"></div>
              </PlayProgressContainer>
              <div className="w-full flex flex-row justify-between">
                <span className="time-label">{formatTime(currentTime)}</span>
                <span className="time-label">{formatTime(duration)}</span>
              </div>
              {/* 오디오 엘리먼트 추가 */}
              <audio ref={audioRef} src={audioDownloadUrl} />
            </MusicPlaySection>
          </div>
          <div className="w-full flex flex-row gap-[10px] justify-center ">
            {type != "MANY" && (
              <button
                className="download-btn"
                onClick={handleCoverImageDownload}
              >
                Download Cover Image
                <DownloadIcon />
              </button>
            )}
            {type != "ONE" && (
              <button
                className="download-btn"
                onClick={handleSectionImagesDownload}
              >
                Download Section Images
                <DownloadIcon />
              </button>
            )}
          </div>
        </Container>
      </ContentWrapper>
      <NextButton onClick={() => navigate("/home")}>Terminate →</NextButton>
    </CreateLayout>
  );
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

const MusicPlaySection = styled.div`
  ${tw`w-full flex flex-col items-start`}
  .song-title {
    ${tw`font-display font-semibold text-xl text-white mb-[30px]`}
  }
  .time-label {
    ${tw`font-display font-light text-subGray text-sm `}
  }
`;

const PlayProgressContainer = styled.div<{ progress: number }>`
  ${tw`relative w-full h-[5px] rounded-[4px] bg-[#000000] mt-[20px] mb-2`}

  .progress-filled {
    ${tw` h-full rounded-[4px] bg-mainColor`}

    width: ${({ progress }) => `${progress}%`};
  }
`;
