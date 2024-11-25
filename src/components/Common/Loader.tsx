import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
type LoaderProps = {
  description: string;
};
function Loader({ description }: LoaderProps) {
  return (
    <Container>
      <span className="text">{description}</span>
      <div className="w-full gap-x-2 flex justify-center items-center">
        <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
        <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
        <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
      </div>
    </Container>
  );
}

export default Loader;

const Container = styled.div`
  ${tw`w-full flex flex-col items-center justify-center m-auto `}\

  .text {
    ${tw` text-center font-display font-normal text-md text-white mb-3`}
  }
`;
