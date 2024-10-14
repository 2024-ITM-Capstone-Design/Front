import React, { useState, useEffect } from "react";

import TickIcon from "../assets/icons/tick-icon";
import DotIcon from "../assets/icons/dot";
import tw from "twin.macro";
import styled, { keyframes, css } from "styled-components";

type ProgressProps = {
  currentStep: number;
};
function Progress({ currentStep }: ProgressProps) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    // currentStep이 변경될 때 애니메이션을 실행하도록 상태를 true로 설정
    setAnimate(true);
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 500); // 애니메이션 지속 시간 후에 false로 변경

    return () => clearTimeout(timeout); // 클린업 함수로 타임아웃을 정리
  }, [currentStep]);

  const ViewStatus = ({
    status,
  }: {
    status: "before" | "present" | "after";
  }) => {
    if (status === "before") {
      return (
        <StatusIcon status="before" $animate={animate}>
          <DotIcon width={8} height={8} />
        </StatusIcon>
      );
    } else if (status === "present") {
      return (
        <StatusIcon status="present" $animate={animate}>
          <DotIcon width={8} height={8} />
        </StatusIcon>
      );
    } else {
      return (
        <StatusIcon status="after" $animate={animate}>
          <TickIcon width={13} height={11} color={"#FFFFFF"} />
        </StatusIcon>
      );
    }
  };

  const steps = [0, 1, 2, 3, 4]; // 총 4단계
  const steps_name = [
    {
      label: "Service Selection",
      text: "Select the category for the service you want.",
    },
    {
      label: "Upload File & Enter Details",
      text: "Upload your audio file and enter details.",
    },
    {
      label: "Discover Music Insights",
      text: "Explore the emotional characteristics of your song.",
    },
    {
      label: "Generate Image Prompt",
      text: "Create the final prompt for generating images.",
    },
    {
      label: "View & Download",
      text: "View and download the generated result.",
    },
  ];

  return (
    <Wrapper>
      <ProgressBar>
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <ViewStatus
              status={
                currentStep > step
                  ? "after"
                  : currentStep === step
                  ? "present"
                  : "before"
              }
              key={index}
            />
            {index < steps.length - 1 && (
              <Line key={`line-${index}`} $active={currentStep > step} />
            )}
          </div>
        ))}
      </ProgressBar>
      <StepBar>
        {steps_name.map((step, index) => (
          <div className="step-box" key={index}>
            <span className="main-text">{step.label}</span>
            <span className="sub-text">{step.text}</span>
          </div>
        ))}
      </StepBar>
    </Wrapper>
  );
}

export default Progress;

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

const Wrapper = styled.div`
  ${tw`h-[335px] bg-gray [border-radius: 15px] flex flex-row p-2`}
`;

const StepBar = styled.div`
  ${tw`flex flex-col h-[260px] justify-between ml-4 mt-8`}
  .step-box {
    ${tw`flex flex-col`}
    .main-text {
      ${tw`font-display font-medium text-sm text-mainColor`}
    }
    .sub-text {
      ${tw`font-display font-light text-caption text-subGray w-[250px]`}
    }
  }
`;
const ProgressBar = styled.div`
  ${tw`flex flex-col items-center w-[24px] h-[240px] justify-between ml-7 mt-9`}
`;

const StatusIcon = styled.div<{
  status: "before" | "present" | "after";
  $animate: boolean;
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

  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${statusChange} 0.5s ease-in-out;
    `}
`;

const Line = styled.div<{ $active: boolean }>`
  ${tw`w-0.5 h-8 [border-radius: 2px]`}
  background: ${(props) => (props.$active ? "#8D7EFD" : "#FFFFFF")};
`;
