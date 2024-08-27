import React from "react";
import CreateLayout from "../components/CreateLayout";
import Progress from "../components/Create/Progress";
import * as C from "../styles/create.style";
import { useLocation, useNavigate } from "react-router-dom";
function FileUpload() {
  const navigate = useNavigate();
  const location = useLocation();

  const { menu } = location.state;
  console.log("state", location.state);

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

export default FileUpload;
