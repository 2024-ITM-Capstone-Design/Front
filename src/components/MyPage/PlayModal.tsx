import { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { ResultData } from "../../type/result";
import ImgSlider from "../ViewResult/ImgSlider";
import MusicPlaySection from "../ViewResult/MusicPlaySection";
function PlayModal({
  audioDownloadUrl,
  imageDownloadUrl,
  type,
  duration,
  audioName,
  onClose,
}: ResultData & { onClose: () => void }) {
  const [currentTime, setCurrentTime] = useState<number>(0); // 오디오 현재 시간 상태 추가

  return (
    <Overlay onClick={onClose}>
      {/* Overlay 클릭 시 모달 닫기 */}
      <Container onClick={(e) => e.stopPropagation()}>
        {/* 컨테이너 클릭 시 모달 닫기 방지 */}
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
          <MusicPlaySection
            audioDownloadUrl={audioDownloadUrl}
            setCurrentTime={setCurrentTime}
            duration={duration}
            audioName={audioName}
          />
        </div>
      </Container>
    </Overlay>
  );
}

export default PlayModal;

const Overlay = styled.div`
  ${tw`
        w-full h-full bg-[black] bg-opacity-50 
        fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]
        flex justify-center items-center
        z-[2]
    `}
`;

const Container = styled.div`
  ${tw`flex flex-col items-center py-[50px] px-[34px] w-full min-h-[420px] rounded-[16px] mt-[30px] bg-black mx-40`}
`;

const ImgContainer = styled.img`
  ${tw`w-[290px] h-[290px] rounded-[20px] mb-5`}
`;
