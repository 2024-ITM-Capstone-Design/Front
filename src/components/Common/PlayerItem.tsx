import React, { useState, useEffect, useRef, useCallback } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import PlayIcon from "../../assets/icons/play-icon";
import StopIcon from "../../assets/icons/stop-icon";
import { ReactComponent as Timer } from "../../assets/timer.svg";
import { formatTime } from "../../utils/format-time";

type PlayerItemProps = {
  segmentIndex: number;
  totalDuration: number;
  audioUrl: string;
  text: string;
  onChange: (newText: string) => void;
};
function PlayerItem({
  segmentIndex,
  totalDuration,
  audioUrl,
  text,
  onChange,
}: PlayerItemProps) {
  const [play, setPlay] = useState<boolean>(false);
  const [segmentStart, setSegmentStart] = useState<number>(0);
  const [segmentEnd, setSegmentEnd] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(text);
  const segmentDuration = 36;

  const audioRef = useRef<HTMLAudioElement | null>(null); // 오디오 엘리먼트를 참조

  useEffect(() => {
    //전체 노래 시간(mm:ss)을 초 단위로 변환
    const totalSeconds = totalDuration;
    const start = (segmentIndex - 1) * segmentDuration;
    const end = Math.min(start + segmentDuration, totalSeconds);
    setSegmentStart(start);
    setSegmentEnd(end);
  }, [segmentIndex, totalDuration, segmentDuration]);

  //수정했을 시 호출되는 함수, useCallback 사용
  const handleSave = useCallback(() => {
    setEditMode(false);
    onChange(editedText); // 수정된 텍스트를 부모로 전달
  }, [editedText, onChange]);

  // 오디오 재생/중지 함수, useCallback 사용
  const handlePlay = useCallback(() => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.pause(); // 오디오 중지
      } else {
        audioRef.current.play(); // 오디오 재생
      }
      setPlay(!play);
    }
  }, [play]);
  return (
    <Wrapper>
      <button className="play-btn" onClick={handlePlay}>
        {!play ? <PlayIcon /> : <StopIcon />}
      </button>
      <ColBox className="w-[95px] mx-[15px]">
        <span className="index">Segment {segmentIndex}</span>
        <RowBox className="items-center mt-1">
          <Timer />
          <span className="time">{`${formatTime(segmentStart)}-${formatTime(
            segmentEnd
          )}`}</span>
        </RowBox>
      </ColBox>
      {editMode ? (
        <>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button className="modify-btn" onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <>
          <p className="text-xs" onClick={() => setEditMode(true)}>
            {editedText}
          </p>
          <button className="modify-btn" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </>
      )}
      {/* audio 엘리먼트 추가 */}
      <audio ref={audioRef} src={audioUrl} />
      {/* <span >{text}</span> */}
    </Wrapper>
  );
}

export default PlayerItem;

const Wrapper = styled.div`
  ${tw`w-full h-[200px] rounded-[10px] bg-[#1E1F25] font-display flex flex-row items-center px-5 my-2`}

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
    -webkit-line-clamp: 8; /* 8줄까지만 표시 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: default;
  }
  .modify-btn {
    ${tw`w-[100px] h-[39px] rounded-[9px] bg-[#282932] font-light text-sm text-white ml-4`}
  }
  textarea {
    ${tw`w-[395px] mx-2 font-light text-xs text-white bg-[#1E1F25] h-[180px] resize-none border-2 rounded-sm`}

    &:focus {
      ${tw`outline-white `}
    }
  }
`;

const ColBox = styled.div`
  ${tw`flex flex-col items-center`}
`;

const RowBox = styled.div`
  ${tw`flex items-center`}
`;
