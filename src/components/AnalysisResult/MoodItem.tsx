import React from "react";

import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as Timer } from "../../assets/timer.svg";
type ItemProps = {
  time: string;
  imgUrl: string;
  mood: string;
};
function MoodItem({ time, imgUrl, mood }: ItemProps) {
  return (
    <>
      <TimeBox>
        <Timer className="mr-1" />
        <span className="text">{time}</span>
      </TimeBox>
      <img src={imgUrl} alt="mood img" width={115} className="mx-auto my-4" />
      <MoodBox>
        <span className="text-sm">{mood}</span>
      </MoodBox>
    </>
  );
}

export default MoodItem;
const TimeBox = styled.div`
  ${tw`w-[110px] h-[26px] flex items-center border-2 border-subGray rounded-[5px] justify-center mx-auto mt-1`}
  .text {
    ${tw`font-light text-subGray text-sm`}
  }
`;

const MoodBox = styled.div`
  ${tw`w-[110px] h-[26px] flex items-center justify-center  rounded-[5px] mx-auto mt-1`}
  .text-sm {
    ${tw`font-light text-white text-sm my-0.5`}
  }
`;
