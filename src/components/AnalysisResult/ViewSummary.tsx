import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as PlayListIcon } from "../../assets/playlist-icon.svg";
function ViewSummary() {
  const content =
    "The main theme of the song is nostalgia and reminiscing about a past love. The lyrics depict a summer in 2002 when the singer was 11 years old and fell in love, but now years later they are reflecting on those memories and how they shaped them. The key emotions conveyed are love, innocence, and nostalgia. The central narrative of the song is about a first love and the memories associated with it, with the main message being that some moments stay with us forever. ";
  return (
    <Container>
      <div className="flex flex-row gap-2">
        <PlayListIcon />
        <span className="text-md">Summary of the song</span>
      </div>
      <span className="text-sm">{content}</span>
    </Container>
  );
}

export default ViewSummary;

const Container = styled.div`
  ${tw`w-full  flex flex-col items-start  justify-center bg-black rounded-[16px] py-4 px-3 mt-2 drop-shadow-[ 0px 4px 4px rgba(0, 0, 0, 0.4)]`}

  .text-md {
    ${tw`font-medium text-mint text-base mb-1`}
  }
  .text-sm {
    ${tw`font-light text-subGray text-sm`}
  }
`;
