import React, { ReactNode } from "react";
import tw from "twin.macro";
import styled from "styled-components";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;

  children?: ReactNode;
};
function NextButton({ onClick, disabled, type, children }: ButtonProps) {
  return (
    <NextBtn type={type} onClick={onClick} disabled={disabled}>
      {children}
    </NextBtn>
  );
}

export default NextButton;

const NextBtn = styled.button`
  ${tw`flex flex-row items-center justify-center w-44 h-11 bg-mainColor [border-radius: 10px] font-display text-md text-white mt-6`}
  &:hover {
    ${tw`bg-subColor`}
  }
  &:disabled {
    ${tw`bg-gray`}
  }
`;
