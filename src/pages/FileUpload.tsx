import React from "react";
import CreateLayout from "../components/CreateLayout";
import Progress from "../components/Progress";

import { useLocation } from "react-router-dom";
import SingleForm from "../components/FIleUpload/SingleForm";
import ManyForm from "../components/FIleUpload/ManyForm";
function FileUpload() {
  const location = useLocation();

  const { menu } = location.state;
  console.log("state", location.state);

  //서비스 선택에 따라 컴포넌트 조건부 렌더링
  const ViewComponent = ({ menu }: { menu: "one" | "many" | "both" }) => {
    if (menu === "one") {
      return <SingleForm menu={menu} />;
    } else if (menu === "many") {
      return <ManyForm />;
    } else {
      return <SingleForm menu={menu} />;
    }
  };
  return (
    <CreateLayout>
      <Progress currentStep={1} />
      <div className="flex flex-col items-end">
        <ViewComponent menu={menu} />
      </div>
    </CreateLayout>
  );
}

export default FileUpload;
