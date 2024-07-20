import React from "react";
import { useNavigate } from "react-router-dom";
import * as N from "../styles/navbar.style";

function NavBar() {
  const navigate = useNavigate();
  return (
    <N.Wrapper>
      <N.Container>
        <span className="logo">SoundPalette</span>
      </N.Container>

      <N.Container>
        <span className="menu">서비스 소개</span>
        <span className="menu">뮤직팔레트 생성</span>
        <button className="login-btn" onClick={() => navigate("login")}>
          Login
        </button>
      </N.Container>
    </N.Wrapper>
  );
}

export default NavBar;
