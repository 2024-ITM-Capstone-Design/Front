import React, { useEffect, useRef, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import PlayIcon from "../../assets/play-icon.svg?react";
import RepeatIcon from "../../assets/repeat-icon.svg?react";
import PauseIcon from "../../assets/pause-icon.svg?react";
import { formatTime } from "../../utils/format-time";
//노래를 전달받아 재생할 수 있는 뮤직플레이 컴포넌트

type MusicPlayProps = {
  audioDownloadUrl: string;
  duration: number;
  audioName: string;
  setCurrentTime?: React.Dispatch<React.SetStateAction<number>>;
};
function MusicPlaySection({
  audioDownloadUrl,
  duration,
  audioName,
  setCurrentTime,
}: MusicPlayProps) {
  const [play, setPlay] = useState<boolean>(false);
  const [playProgress, setPlayProgress] = useState<number>(0); // 진행 바 상태 관리
  const [isDragging, setIsDragging] = useState<boolean>(false); // 드래그 상태 관리

  const [internalCurrentTime, setInternalCurrentTime] = useState<number>(0); // 오디오 현재 시간 상태 추가
  const progressRef = useRef<HTMLDivElement>(null); // progress bar 참조

  const audioRef = useRef<HTMLAudioElement>(null); // 오디오 엘리먼트를 참조

  useEffect(() => {
    if (audioRef.current) {
      const handleTimeUpdate = () => {
        const time = Math.floor(audioRef.current?.currentTime || 0);
        setInternalCurrentTime(time);
        if (setCurrentTime) {
          setCurrentTime(time);
        }
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
      setInternalCurrentTime(newCurrentTime); // currentTime 업데이트
      if (setCurrentTime) {
        setCurrentTime(newCurrentTime);
      }
      audioRef.current.currentTime = newCurrentTime; // 오디오 재생 위치 업데이트
    }
  };

  const handleRepeat = () => {
    setInternalCurrentTime(0);
    if (setCurrentTime) {
      setCurrentTime(0);
    }
    audioRef.current?.currentTime && (audioRef.current.currentTime = 0);
    setPlayProgress(0);
    setPlay(true);
    audioRef.current?.play();
  };
  return (
    <Container>
      <span className="song-title">{audioName}</span>
      <div className="flex flex-row gap-2">
        {play ? (
          <PauseIcon onClick={handlePlay} />
        ) : (
          <PlayIcon onClick={handlePlay} />
        )}
        <RepeatIcon onClick={() => {}} />
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
        <span className="time-label">{formatTime(internalCurrentTime)}</span>
        <span className="time-label">{formatTime(duration)}</span>
      </div>
      {/* 오디오 엘리먼트 추가 */}
      <audio ref={audioRef} src={audioDownloadUrl} />
    </Container>
  );
}

export default MusicPlaySection;
const Container = styled.div`
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
