import CreateLayout from "../../components/Common/CreateLayout";
import tw from "twin.macro";
import styled from "styled-components";
import ImgSlider from "../../components/ViewResult/ImgSlider";
import DummyImg from "../../assets/Dummy/dummyImg.png";
import { ReactComponent as PlayIcon } from "../../assets/play-icon.svg";
import { ReactComponent as RepeatIcon } from "../../assets/repeat-icon.svg";
import { ReactComponent as PauseIcon } from "../../assets/pause-icon.svg";
import { ReactComponent as DownloadIcon } from "../../assets/download-icon.svg";
import { useRef, useState } from "react";
import NextButton from "../../components/Common/NextButton";
import { useNavigate } from "react-router-dom";
function ViewResult() {
  const navigate = useNavigate();
  const type: string = "ONE";
  const [play, setPlay] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null); // 오디오 엘리먼트를 참조

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
  return (
    <CreateLayout currentStep={4}>
      <ContentWrapper>
        <span className="title-md">View & Download</span>
        <span className="text-sm">
          Image generation is complete! Check out the results now.
        </span>
        <Container>
          <div className="flex flex-row gap-[25px] w-full items-center">
            {type === "ONE" ? <ImgContainer src={DummyImg} /> : <ImgSlider />}
            <MusicPlaySection>
              <span className="song-title">2002</span>
              <div className="flex flex-row gap-2">
                {play ? (
                  <PauseIcon />
                ) : (
                  <PlayIcon onClick={() => setPlay(!play)} />
                )}
                <RepeatIcon />
              </div>
              <PlayProgressContainer></PlayProgressContainer>
              <div className="w-full flex flex-row justify-between">
                <span className="time-label">0:00</span>
                <span className="time-label">3:40</span>
              </div>
            </MusicPlaySection>
          </div>
          <div className="w-full flex flex-row gap-[10px] justify-center ">
            {type != "MANY" && (
              <button className="download-btn">
                Download Cover Image
                <DownloadIcon />
              </button>
            )}
            {type != "ONE" && (
              <button className="download-btn">
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

const PlayProgressContainer = styled.div`
  ${tw`relative w-full h-[5px] rounded-[4px] bg-[#000000] mt-[20px] mb-2`}
`;
