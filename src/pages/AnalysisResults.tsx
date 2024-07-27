import React from "react";
import CreateLayout from "../components/CreateLayout";
import * as C from "../styles/create.style";
import Progress from "../components/Create/Progress";
import { useNavigate } from "react-router-dom";
function AnalysisResults() {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/create/check-result");
  };
  return (
    <CreateLayout>
      <Progress currentStep={2} />
      <div className="flex flex-col items-end">
        <C.ContentWrapper></C.ContentWrapper>
        <C.NextButton onClick={goToNextPage}>Next →</C.NextButton>
      </div>
    </CreateLayout>
  );
}

export default AnalysisResults;
