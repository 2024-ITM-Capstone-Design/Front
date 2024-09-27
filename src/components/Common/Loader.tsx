import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
type LoaderProps = {
  description: string;
};
function Loader({ description }: LoaderProps) {
  return (
    <Overlay>
      <Container>
        <span className="text">{description}</span>
        <div className="w-full gap-x-2 flex justify-center items-center">
          <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
          <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
          <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
        </div>
      </Container>
    </Overlay>
  );
}

export default Loader;
const Overlay = styled.div`
  ${tw`
        w-full h-full bg-[rgba(247, 247, 247, 0.1)]
        fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]
        flex justify-center items-center
        z-[2]
    `}
`;

const Container = styled.div`
  ${tw`w-[400px] h-[300px] rounded-[10px] flex flex-col items-center justify-center bg-[black]`}\

    .text {
    ${tw`font-display font-normal text-base text-white mb-2`}
  }
`;
