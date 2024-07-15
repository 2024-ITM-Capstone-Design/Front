import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as PCIcon } from "../assets/login-bg.svg";
import * as L from "../styles/sign-in-up.style";
import ArrowIcon from "../assets/icons/right-arrow";
function Login() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] overflow-hidden">
      <PCIcon className="absolute w-[480px] h-[500px] left-0 top-44 overflow-hidden" />
      <L.Wrapper>
        <span className="logo" onClick={() => navigate("/")}>
          SoundPalette
        </span>
      </L.Wrapper>
      <L.LoginLayout>
        <span className="title">Log In to SoundPalette</span>
        <L.FormLayout>
          <label>아이디</label>
          <input name="id" placeholder="아이디를 입력해주세요" />
          <label>비밀번호</label>
          <input name="password" placeholder="비밀번호를 입력해주세요" />
          <L.Submitbtn>Sign In</L.Submitbtn>
        </L.FormLayout>
        <button className="navigate-btn">
          <span className="text">Don’t have an account? Sign up</span>
          <ArrowIcon width={14} height={14} color="#FFFFFF" />
        </button>
      </L.LoginLayout>
    </div>
  );
}

export default Login;
