import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import Progress from "../Progress";
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
        {/* <span className="font-display text-white text-sm mt-2">
          내 음악과 어울리는 이미지/영상을 생성하고, 활용해보세요 !
        </span> */}
        {/* 페이지에 맞게 컴포넌트 렌더링 */}
        <div className="w-full flex flex-row mt-10 gap-7">
          <Progress currentStep={currentStep} />
          <div className="w-full flex flex-col items-end">{children}</div>
        </div>
      </div>
    </>
  );
}

export default CreateLayout;
