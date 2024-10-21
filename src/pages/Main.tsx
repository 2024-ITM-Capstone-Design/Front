import { useCallback } from "react";
import NavBar from "../components/Common/NavBar";
import { ReactComponent as Oval } from "../assets/oval.svg";
import { ReactComponent as MainBg } from "../assets/main-bg.svg";
import tw from "twin.macro";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Main() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const handleClick = useCallback(() => {
    if (!isLoggedIn) {
      alert("Please log in to access this feature.");
    } else {
      navigate("/create/service-selection");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      <Oval className="absolute top-0" />
      <MainBg className="absolute right-0" />
      <NavBar menu="" />
      <div className="mx-auto w-full xl:max-w-7xl ">
        <MainWrapper>
          <span className="main-title">Create Your Own Music Palette</span>
          <span className="main-exp">
            Sound Palette is a platform that can be create images or videos for
            your own music with AI.
          </span>
          <NaviButton onClick={handleClick}>Create My Music Palette</NaviButton>
        </MainWrapper>
      </div>
    </>
  );
}

export default Main;
const MainWrapper = styled.div`
  ${tw`w-[560px] flex flex-col my-auto ml-5 `}

  .main-title {
    ${tw`font-display text-7xl text-white mt-40`}
  }
  .main-exp {
    ${tw`font-display text-base text-white mt-6`}
  }
  .navi-button {
    ${tw` w-60 h-10 rounded-lg text-white font-display mt-10 z-10`}

    background-color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const NaviButton = styled.button`
  ${tw`w-60 h-10 rounded-lg text-white font-display mt-10 z-10`}

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
