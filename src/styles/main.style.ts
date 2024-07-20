import tw from "twin.macro";
import styled from "styled-components";

export const MainWrapper = styled.div`
  ${tw`w-[550px] flex flex-col my-auto`}

  .main-title {
    ${tw`font-fira text-7xl text-white mt-40`}
  }
  .main-exp {
    ${tw`font-fira text-base text-white mt-6`}
  }
  .navi-button {
    ${tw` w-60 h-10 rounded-lg text-white font-fira mt-10 z-10`}

    background-color: ${({ theme }) => theme.colors.mainColor};
  }
`;

export const NaviButton = styled.button`
  ${tw`w-60 h-10 rounded-lg text-white font-fira mt-10 z-10`}

  background-color: ${({ theme }) => theme.colors.mainColor};

  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 450ms ease-in-out;

  &:hover {
    background: linear-gradient(0deg, #a47cf3, #683fea);
    box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4),
      inset 0px -4px 0px 0px rgba(0, 0, 0, 0.2),
      0px 0px 0px 4px rgba(255, 255, 255, 0.2), 0px 0px 180px 0px #9917ff;
    transform: translateY(-2px);
  }

  &:hover .text {
    color: white;
  }

  &:hover .sparkle {
    fill: white;
    transform: scale(1.2);
  }
`;
