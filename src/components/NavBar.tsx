import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as KakaoSignUp } from "../assets/kakao-sign-in.svg";
import tw from "twin.macro";
import styled from "styled-components";
import { useAuthStore } from "../store/useAuthStore";
import { logout } from "../api/user";
type MenuProps = {
  menu: string;
};
function NavBar({ menu }: MenuProps) {
  const navigate = useNavigate();

  const [isHover, setIsHovered] = useState(false);

  const { isLoggedIn } = useAuthStore();

  const handleLogin = () => {
    const API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = "http://localhost:3000/redirect";
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URI;
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      useAuthStore.setState({
        isLoggedIn: false,
        userData: { id: "", nickName: "" },
        accessToken: "",
      });
    }
  };
  return (
    <Wrapper>
      <Container>
        <span
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          SoundPalette
        </span>
      </Container>

      <Container>
        <Menu
          className="menu"
          disabled={menu === "intro"}
          $active={menu === "intro"}
          onClick={() => {
            navigate("/intro");
          }}
        >
          Service Overview
        </Menu>
        <Menu
          className="menu"
          onClick={() => {
            if (!isLoggedIn) {
              alert("Please log in to access this feature.");
            } else {
              navigate("/create/service-selection");
            }
          }}
          disabled={menu === "create"}
          $active={menu === "create"}
        >
          Create Music Palette
        </Menu>
        {!isLoggedIn ? (
          <SocialContainer>
            <button
              className="login-btn"
              onClick={handleLogin}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Login
            </button>
            {isHover && <KakaoSignUp className="absolute top-11" />}
          </SocialContainer>
        ) : (
          <>
            <Menu
              className="menu"
              onClick={() => {
                navigate("/my-page");
              }}
              disabled={menu === "my-page"}
              $active={menu === "my-page"}
            >
              My Page
            </Menu>

            <SocialContainer>
              <button className="login-btn" onClick={handleLogout}>
                Logout
              </button>
              {isHover && <KakaoSignUp className="absolute top-11" />}
            </SocialContainer>
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default NavBar;

const Wrapper = tw.div`flex flex-row items-center justify-between mx-auto max-w-7xl mt-10 `;
const Container = styled.div`
  ${tw`flex flex-row items-center z-10`}

  .logo {
    ${tw`text-mainColor font-display font-bold text-lg cursor-default`}
  }
`;

const SocialContainer = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    w-[85px]
    cursor-pointer
    relative
`}

  .login-btn {
    ${tw`w-32 h-10 bg-mainColor rounded-lg text-white font-display relative`}
    &:hover {
      ${tw`bg-subColor`}
    }
  }
`;

type menuProps = {
  $active: boolean;
};
const Menu = styled.button<menuProps>`
  ${tw`font-display font-normal text-base mr-16 `}
  color: ${(props) =>
    props.$active ? props.theme.colors.white : props.theme.colors.subGray};
  cursor: ${(props) => (props.$active ? "default" : "pointer")};

  position: relative;
  border: none;
  background: none;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: color;

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus:after,
  &:hover:after {
    width: 100%;
    left: 0%;
  }

  &::after {
    content: "";
    pointer-events: none;
    bottom: -2px;
    left: 50%;
    position: absolute;
    width: 0%;
    height: 2px;
    background-color: #fff;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 400ms;
    transition-property: width, left;
  }
`;
