import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as PlayListIcon } from "../../assets/playlist-icon.svg";
function ViewMood() {
  const mood = "admiration";

  // 이미지 경로 설정 (동적으로)
  const getImage = (mood: string) => {
    try {
      return require(`../../assets/mood/${mood}.png`);
    } catch (err) {
      console.error("Image not found:", mood);
      // 이미지가 없는 경우를 위한 기본 이미지
    }
  };
  return (
    <Container>
      <div className="flex flex-row gap-2">
        <PlayListIcon />
        <span className="text-md">Mood of lyrics</span>
      </div>
      <img
        src={getImage(mood)}
        alt="mood img"
        width={140}
        className="mx-auto my-4"
      />
      <span className="text-sm">{mood}</span>
    </Container>
  );
}

export default ViewMood;
const Container = styled.div`
  ${tw`w-[400px] h-[280px] flex flex-col items-start bg-black rounded-[16px] py-4 px-3 drop-shadow-[ 0px 4px 4px rgba(0, 0, 0, 0.4)]`}

  .text-md {
    ${tw`w-full text-start font-display font-medium text-mint text-base mb-1`}
  }

  .text-sm {
    ${tw`mx-auto font-light text-white text-sm my-2`}
  }
`;
