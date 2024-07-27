import tw from "twin.macro";
import styled, { keyframes, css } from "styled-components";

// 애니메이션 정의
const statusChange = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  ${tw`w-[356px] h-[310px] bg-gray [border-radius: 15px] flex flex-row`}
`;

export const StepBar = styled.div`
  ${tw`flex flex-col h-[244px] justify-between ml-4 mt-8`}
  .step-box {
    ${tw`flex flex-col`}
    .main-text {
      ${tw`font-display text-sm text-mainColor`}
    }
    .sub-text {
      ${tw`font-display text-caption text-subGray`}
    }
  }
`;
export const ProgressBar = styled.div`
  ${tw`flex flex-col items-center w-[24px] h-[228px] justify-between ml-7 mt-9`}
`;

export const StatusIcon = styled.div<{
  status: "before" | "present" | "after";
  animate: boolean;
}>`
  ${tw`w-6 h-6 [border-radius: 12px] flex items-center justify-center`}

  background: ${({ status }) => {
    switch (status) {
      case "before":
        return "#FFFFFF";
      case "present":
      case "after":
        return "#8D7EFD";
      default:
        return "#FFFFF";
    }
  }};

  box-shadow: ${(props) =>
    props.status === "present" ? " 0px 0px 0px 4px #F2F4F7" : "none"};

  ${({ animate }) =>
    animate &&
    css`
      animation: ${statusChange} 0.5s ease-in-out;
    `}
`;

export const Line = styled.div<{ active: boolean }>`
  ${tw`w-0.5 h-8 [border-radius: 2px]`}
  background: ${(props) => (props.active ? "#8D7EFD" : "#FFFFFF")};
`;
