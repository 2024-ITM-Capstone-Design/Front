import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import PlayIcon from "../assets/icons/play-icon";
import StopIcon from "../assets/icons/stop-icon";
import { ReactComponent as Timer } from "../assets/timer.svg";
import * as C from "../styles/create.style";
import { formatTime } from "../utils/format-time";
type PlayerItemProps = {
  segmentIndex: number;
  totalDuration: string; // 전체 길이, 예: "3:30"
};
function PlayerItem({ segmentIndex, totalDuration }: PlayerItemProps) {
  const [play, setPlay] = useState<boolean>(false);
  const [segmentStart, setSegmentStart] = useState<number>(0);
  const [segmentEnd, setSegmentEnd] = useState<number>(0);
  const segmentDuration = 36;
  useEffect(() => {
    //전체 노래 시간(mm:ss)을 초 단위로 변환
    const totalSeconds = totalDuration
      .split(":")
      .reduce((acc, time) => 60 * acc + +time, 0);
    const start = segmentIndex * segmentDuration;
    const end = Math.min(start + segmentDuration, totalSeconds);
    setSegmentStart(start);
    setSegmentEnd(end);
  }, [segmentIndex, totalDuration, segmentDuration]);
  return (
    <Wrapper>
      <button className="play-btn" onClick={() => setPlay(!play)}>
        {!play ? <PlayIcon /> : <StopIcon />}
      </button>
      <C.ColBox className="w-[95px] mx-[15px]">
        <span className="index">구간 {segmentIndex + 1}</span>
        <C.RowBox className="items-center">
          <Timer />
          <span className="time">{`${formatTime(segmentStart)}-${formatTime(
            segmentEnd
          )}`}</span>
        </C.RowBox>
      </C.ColBox>
      <span className="text-xs">
        표현이 서툰 것도 잘못인가요? 나 차가운 도시에 따뜻한 여잔데 그냥
        좋아한단 말도 안 되는가요? 솔직하게 난 말하고 싶어요 사라져 아니
        사라지지 마
      </span>
      <button className="modify-btn">수정하기</button>
    </Wrapper>
  );
}

export default PlayerItem;

const Wrapper = styled.div`
  ${tw`w-full h-[85px] rounded-[10px] bg-[#1E1F25] font-display flex flex-row items-center px-5 my-2`}

  .play-btn {
    ${tw`w-[35px] h-[35px] rounded-full bg-mainColor flex items-center justify-center`}
  }
  .index {
    ${tw`font-medium text-xs  text-white`}
  }
  .time {
    ${tw`font-light text-xs text-subGray ml-0.5`}
  }
  .text-xs {
    ${tw`w-[395px] mx-2 font-light text-xs text-white`}
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 두 줄까지만 표시 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: default;
  }
  .modify-btn {
    ${tw`w-[100px] h-[39px] rounded-[9px] bg-[#282932] font-light text-sm text-white ml-2`}
  }
`;
