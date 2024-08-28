import React from "react";
import CreateLayout from "../components/CreateLayout";
import Progress from "../components/Progress";
import * as C from "../styles/create.style";
import tw from "twin.macro";
import styled from "styled-components";
import PlayerItem from "../components/PlayerItem";
import { useNavigate } from "react-router-dom";

function CheckLyric() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/create/analysis-result");
  };
  return (
    <CreateLayout>
      <Progress currentStep={1} />
      <div className="flex flex-col items-end">
        <C.ContentWrapper>
          <label className="title-md">가사분할 & 편집</label>
          <label className="text-sm">
            AI가 36초 간격으로 자동 추출한 노래 가사입니다! 정확성을 높이기 위해
            수정이 필요한 부분이 있으면 직접 편집해주세요.
          </label>
          <ItemBox>
            <PlayerItem segmentIndex={0} totalDuration="3:30" />
            <PlayerItem segmentIndex={1} totalDuration="3:30" />
            <PlayerItem segmentIndex={2} totalDuration="3:30" />
            <PlayerItem segmentIndex={3} totalDuration="3:30" />
            <PlayerItem segmentIndex={4} totalDuration="3:30" />
            <PlayerItem segmentIndex={5} totalDuration="3:30" />
          </ItemBox>
        </C.ContentWrapper>
        <C.NextButton onClick={handleNext}>Next →</C.NextButton>
      </div>
    </CreateLayout>
  );
}

export default CheckLyric;

const ItemBox = styled.div`
  ${tw`w-[750px] h-[460px] mt-7 overflow-auto`}

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
`;
