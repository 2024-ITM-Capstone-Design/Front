import React from "react";
import NavBar from "../components/NavBar";
import { ReactComponent as Oval } from "../assets/oval.svg";
import { ReactComponent as MainBg } from "../assets/main-bg.svg";

import * as M from "../styles/main.style";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Main() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  return (
    <>
      <Oval className="absolute top-0" />
      <MainBg className="absolute right-0" />
      <NavBar menu="" />
      <div className="max-w-7xl mx-auto">
        <M.MainWrapper>
          <span className="main-title">Create Your Own Music Palette</span>
          <span className="main-exp">
            Sound Palette is a platform that can be create images or videos for
            your own music with AI.
          </span>
          <M.NaviButton
            onClick={() => {
              if (!isLoggedIn) {
                alert("Please log in to access this feature.");
              } else {
                navigate("/create/service-selection");
              }
            }}
          >
            Create My Music Palette
          </M.NaviButton>
        </M.MainWrapper>
      </div>
    </>
  );
}

export default Main;
