import tw from "twin.macro";
import styled from "styled-components";
function Ongoing() {
  return (
    <OnGoingItemBox>
      <OngoingItem>
        <span className="title">Suny sunsite</span>
        <span className="hash-tag">#cover#image</span>
        <hr className="w-full h-[0.5px] bg-[#A7AAB5] border-0 my-2" />
        <div className="flex flex-row mx-auto gap-2">
          <button className="continue">Continue</button>
          <button className="continue">Delete</button>
        </div>
      </OngoingItem>
    </OnGoingItemBox>
  );
}

export default Ongoing;

const OnGoingItemBox = styled.div`
  ${tw`w-full grid justify-between [grid-template-columns: repeat(4, 1fr)] `}
`;
const OngoingItem = styled.div`
  ${tw`w-[250px] h-[120px] rounded-[12px] bg-[radial-gradient(241.86% 241.86% at 53.72% -58.25%, #404657 0%, rgba(64, 70, 87, 0) 100%) ] flex flex-col px-[18px] py-[10px] font-display my-[20px]`}
  backdrop-filter: blur(34px);

  .title {
    ${tw`font-medium text-[20px] text-white`}
  }
  .hash-tag {
    ${tw`font-light text-sm text-subGray`}
  }
  .continue {
    ${tw`w-[65px] font-normal text-[16px] text-subGray border-b-[1px] border-b-subGray `}
  }
`;
