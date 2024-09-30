import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import Progress from "../Progress";
import tw from "twin.macro";
import styled from "styled-components";
type LayoutProps = {
  children: ReactNode;
  currentStep: number;
};
function CreateLayout({ children, currentStep }: LayoutProps) {
  return (
    <>
      <NavBar menu="create" />
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <span className="font-fira font-semibold text-mainColor text-xl mt-10">
          Create My Music Palette
        </span>
        {/* <span className="font-display text-white text-sm mt-2">
          내 음악과 어울리는 이미지/영상을 생성하고, 활용해보세요 !
        </span> */}
        {/* 페이지에 맞게 컴포넌트 렌더링 */}
        <div className="flex flex-row mt-10">
          <Progress currentStep={currentStep} />
          <div className="flex flex-col items-end">{children}</div>
        </div>
      </div>
    </>
  );
}

export default CreateLayout;
