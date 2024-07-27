import React from "react";
import CreateLayout from "../components/CreateLayout";
import Progress from "../components/Create/Progress";
import * as C from "../styles/create.style";
import { useNavigate } from "react-router-dom";
function FileUpload() {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/create/service-selection");
  };
  return (
    <CreateLayout>
      <Progress currentStep={0} />
      <div className="flex flex-col items-end">
        <C.ContentWrapper></C.ContentWrapper>
        <C.NextButton onClick={goToNextPage}>Next →</C.NextButton>
      </div>
    </CreateLayout>
  );
}

export default FileUpload;
