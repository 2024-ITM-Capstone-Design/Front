import tw from "twin.macro";
import styled from "styled-components";

export const ContentWrapper = styled.div`
  ${tw`w-[829px] h-[619px] ml-6 bg-gray [border-radius: 15px] p-10 font-display flex flex-col`}
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .title-md {
    ${tw`font-bold text-white text-md`}
  }
  .text-sm {
    ${tw`font-medium text-subGray text-sm`}
  }
`;

export const NextButton = styled.button`
  ${tw`flex flex-row items-center justify-center w-44 h-11 bg-mainColor [border-radius: 10px] font-display text-md text-white mt-6`}
  &:hover {
    ${tw`bg-subColor`}
  }
  &:disabled {
    ${tw`bg-gray`}
  }
`;

export const RowBox = styled.div`
  ${tw`flex flex-row`}
`;
