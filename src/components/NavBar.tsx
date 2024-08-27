import React from "react";
import { useNavigate } from "react-router-dom";
import * as N from "../styles/navbar.style";

type MenuProps = {
  menu: string;
};
function NavBar({ menu }: MenuProps) {
  const navigate = useNavigate();
  return (
    <N.Wrapper>
      <N.Container>
        <span
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          SoundPalette
        </span>
      </N.Container>

      <N.Container>
        <N.Menu
          className="menu"
          disabled={menu === "intro"}
          active={menu === "intro"}
          onClick={() => {
            navigate("/intro");
          }}
        >
          서비스 소개
        </N.Menu>
        <N.Menu
          className="menu"
          onClick={() => {
            navigate("/create/service-selection");
          }}
          disabled={menu === "create"}
          active={menu === "create"}
        >
          뮤직팔레트 생성
        </N.Menu>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </N.Container>
    </N.Wrapper>
  );
}

export default NavBar;
