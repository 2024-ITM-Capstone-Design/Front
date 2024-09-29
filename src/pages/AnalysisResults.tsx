import React from "react";
import CreateLayout from "../components/Common/CreateLayout";
import * as C from "../styles/create.style";
import Progress from "../components/Progress";
import { useNavigate, useParams } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import ViewGraph from "../components/AnalysisResult/ViewGraph";
import ViewMood from "../components/AnalysisResult/ViewMood";

function AnalysisResults() {
  const navigate = useNavigate();
  const { itemId } = useParams() as { itemId: string };
  const goToNextPage = () => {
    navigate("/create/check-result");
  };
  return (
    <CreateLayout>
      <Progress currentStep={2} />
      <div className="flex flex-col items-end">
        <ContentWrapper>
          <span className="title-md">Analysis Result</span>
          <RowBox>
            <ViewGraph />
            <ViewMood />
          </RowBox>
          <span className="title-md">Generated Prompts</span>
        </ContentWrapper>
        <C.NextButton onClick={goToNextPage}>Next →</C.NextButton>
      </div>
    </CreateLayout>
  );
}

export default AnalysisResults;
export const ContentWrapper = styled.div`
  ${tw`w-[829px] h-[619px] ml-6 bg-gray [border-radius: 15px] p-7 font-display flex flex-col`}
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .title-md {
    ${tw`font-semibold text-white text-md`}
  }
  .text-sm {
    ${tw`font-light text-subGray text-sm`}
  }
`;

export const RowBox = styled.div`
  ${tw`w-full gap-[20px] flex flex-row items-center`}
`;
