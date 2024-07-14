import React from "react";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center justify-between mx-auto max-w-7xl mt-10 ">
      <div className="flex flex-row items-center ">
        <span className="text-mainColor font-fira text-lg">SoundPalette</span>
        <span className="font-display font-normal text-sm text-white ml-32">
          서비스 소개
        </span>
        <span className="font-display font-normal text-sm text-white ml-11">
          뮤직팔레트 생성
        </span>
      </div>

      <div className="flex flex-row items-center ">
        <button
          className="w-32 h-10 bg-mainColor rounded-lg text-white font-fira"
          onClick={() => navigate("login")}
        >
          Login
        </button>
        <button
          className="w-32 h-10 box-border px-4 py-2  border border-mainColor rounded-lg text-mainColor ml-3 font-fira"
          onClick={() => navigate("/sign-up")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default NavBar;
