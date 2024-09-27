import React from "react";
import CreateLayout from "../components/Common/CreateLayout";
import Progress from "../components/Progress";
import * as C from "../styles/create.style";
import { useNavigate } from "react-router-dom";
function CheckResult() {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/");
  };
  return (
    <CreateLayout>
      <Progress currentStep={3} />
      <div className="flex flex-col items-end">
        <C.ContentWrapper></C.ContentWrapper>
        <C.NextButton onClick={goToNextPage}>종료 →</C.NextButton>
      </div>
    </CreateLayout>
  );
}

export default CheckResult;
