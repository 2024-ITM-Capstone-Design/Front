import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as PlayListIcon } from "../../assets/playlist-icon.svg";
import { formatTime } from "../../utils/format-time";

import Slider from "react-slick"; // 슬라이더 라이브러리 추가
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MoodItem from "./MoodItem";
type MoodProps = {
  type: string;
  duration: number;
  mood: string[];
};
function ViewMood({ type, duration, mood }: MoodProps) {
  // 이미지 경로 설정 (동적으로)
  const getImage = (mood: string) => {
    try {
      return require(`../../assets/mood/${mood}.png`);
    } catch (err) {
      console.error("Image not found:", mood);
      // 이미지가 없는 경우를 위한 기본 이미지
    }
  };

  const getTimeLabel = (index: number) => {
    // 각 세그먼트의 시작 시간 계산
    const segmentStart = index * 36;

    // 각 세그먼트의 종료 시간 계산
    const segmentEnd =
      index === mood.length
        ? duration // 마지막 세그먼트의 경우 전체 duration을 사용
        : Math.min(segmentStart + 36, duration);

    // 타임스탬프 형성
    const timeLabel = `${formatTime(segmentStart)}-${formatTime(segmentEnd)}`;

    return timeLabel;
  };

  const settings = {
    dots: true,
    infinite: true,
    touchRatio: 0, //드래그 금지
    speed: 500,
    slidesToShow: 1,
    slidesPerRow: 1,
    arrows: true,
    draggable: false,

    appendDots: (dots: any) => (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "7px",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };

  return (
    <Container>
      <div className="w-full flex flex-row gap-2">
        <PlayListIcon />
        <span className="text-md">Mood of lyrics</span>
      </div>
      {type === "ONE" && (
        <div className="w-[80%] text-center m-auto">
          <MoodItem
            time={`0:00 - ${formatTime(duration)}`}
            imgUrl={getImage(mood[0])}
            mood={mood[0]}
          />
        </div>
      )}
      {type === "MANY" && (
        <SliderBox>
          <Slider {...settings}>
            {mood.map((data, index) => (
              <div key={index} className="text-center m-auto">
                <MoodItem
                  time={getTimeLabel(index)}
                  imgUrl={getImage(data)}
                  mood={data}
                />
              </div>
            ))}
          </Slider>
        </SliderBox>
      )}

      {type === "BOTH" && (
        <SliderBox>
          <Slider {...settings} className=" m-auto">
            <div className="w-[80%] text-center m-auto">
              <MoodItem
                time={`0:00 - ${formatTime(duration)}`}
                imgUrl={getImage(mood[0])}
                mood={mood[0]}
              />
            </div>
            {mood.slice(1).map((data, index) => (
              <div className="w-[80%] text-center" key={index}>
                <MoodItem
                  time={getTimeLabel(index)}
                  imgUrl={getImage(data)}
                  mood={data}
                />
              </div>
            ))}
          </Slider>
        </SliderBox>
      )}
    </Container>
  );
}

export default ViewMood;
const Container = styled.div`
  ${tw`w-[300px] h-[280px] flex flex-col items-start bg-black rounded-[16px] py-4 px-3 drop-shadow-[ 0px 4px 4px rgba(0, 0, 0, 0.4)]`}

  .text-md {
    ${tw`w-full text-start font-display font-medium text-mint text-base mb-1`}
  }
`;

const SliderBox = styled.div`
  ${tw`w-[200px] mx-auto`}
`;
