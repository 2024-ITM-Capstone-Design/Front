import React, { ReactNode } from "react";
import NavBar from "../components/Common/NavBar";
import Progress from "../components/Progress";

type LayoutProps = {
  children: ReactNode;
  currentStep: number;
};
function CreateLayout({ children, currentStep }: LayoutProps) {
  return (
    <>
      <NavBar menu="create" />
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-7">
        <span className="font-fira font-semibold text-mainColor text-xl mt-10">
          Create My Music Palette
        </span>
        <div className="w-full flex flex-row mt-10 gap-7">
          <Progress currentStep={currentStep} />
          <div className="w-full flex flex-col items-end">{children}</div>
        </div>
      </div>
    </>
  );
}

export default CreateLayout;
