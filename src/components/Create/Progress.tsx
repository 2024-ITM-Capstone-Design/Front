import React, { useState, useEffect } from "react";
import * as P from "../../styles/progress.style";
import TickIcon from "../../assets/icons/tick-icon";
import DotIcon from "../../assets/icons/dot";

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
        <P.StatusIcon status="before" animate={animate}>
          <DotIcon width={8} height={8} />
        </P.StatusIcon>
      );
    } else if (status === "present") {
      return (
        <P.StatusIcon status="present" animate={animate}>
          <DotIcon width={8} height={8} />
        </P.StatusIcon>
      );
    } else {
      return (
        <P.StatusIcon status="after" animate={animate}>
          <TickIcon width={13} height={11} color={"#FFFFFF"} />
        </P.StatusIcon>
      );
    }
  };

  const steps = [0, 1, 2, 3]; // 총 4단계
  const steps_name = [
    {
      label: "서비스 선택",
      text: "생성 서비스를 원하는 카테고리를 선택해주세요.",
    },
    {
      label: "파일 업로드 및 세부정보 입력",
      text: "오디오 파일을 업로드하고, 세부정보를 입력해주세요.",
    },

    {
      label: "분석결과 확인 및 최종 생성",
      text: "분석결과를 확인하고, 프롬프트를 최종수정해주세요.",
    },
    {
      label: "생성결과 확인",
      text: "생성된 결과를 확인하고 다운로드 하세요.",
    },
  ];
  return (
    <P.Wrapper>
      <P.ProgressBar>
        {steps.map((step, index) => (
          <>
            <ViewStatus
              status={
                currentStep > step
                  ? "after"
                  : currentStep === step
                  ? "present"
                  : "before"
              }
            />
            {index < steps.length - 1 && (
              <P.Line key={`line-${index}`} active={currentStep > step} />
            )}
          </>
        ))}
      </P.ProgressBar>
      <P.StepBar>
        {steps_name.map((step, index) => (
          <div className="step-box">
            <span className="main-text">{step.label}</span>
            <span className="sub-text">{step.text}</span>
          </div>
        ))}
      </P.StepBar>
    </P.Wrapper>
  );
}

export default Progress;
