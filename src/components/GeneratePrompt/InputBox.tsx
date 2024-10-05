import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

type InputProps = {
  title: string;
  example: string;
  id: string;
  register: any;
};
function InputBox({ title, example, id, register }: InputProps) {
  return (
    <Container>
      <label className="title-label">{title}</label>
      <span className="sub-label">{example}</span>
      <input type="text" {...register(id)} />
    </Container>
  );
}

export default InputBox;

const Container = styled.div`
  ${tw`flex flex-col gap-[1px] my-0.5`}
  .title-label {
    ${tw`font-light text-xs text-white`}
  }

  .sub-label {
    ${tw`font-light text-xs text-subGray`}
  }
  input {
    ${tw`w-[290px] h-[25px] rounded-[5px] border-[1px] border-subGray font-light text-xs text-white bg-black pl-0.5`}
  }
`;
