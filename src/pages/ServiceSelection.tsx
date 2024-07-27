import React from "react";
import CreateLayout from "../components/CreateLayout";
import Progress from "../components/Create/Progress";
import * as C from "../styles/create.style";
import { useNavigate } from "react-router-dom";
function ServiceSelection() {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/create/analysis-result");
  };
  return (
    <CreateLayout>
      <Progress currentStep={1} />
      <div className="flex flex-col items-end">
        <C.ContentWrapper></C.ContentWrapper>
        <C.NextButton onClick={goToNextPage}>Next →</C.NextButton>
      </div>
    </CreateLayout>
  );
}

export default ServiceSelection;
