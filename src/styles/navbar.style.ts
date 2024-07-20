import tw from "twin.macro";
import styled from "styled-components";
export const Wrapper = tw.div`flex flex-row items-center justify-between mx-auto max-w-7xl mt-10 `;
export const Container = styled.div`
  ${tw`flex flex-row items-center z-10`}

  .logo {
    ${tw`text-mainColor font-fira text-lg cursor-default`}
  }

  .login-btn {
    ${tw`w-32 h-10 bg-mainColor rounded-lg text-white font-fira`}
    &:hover {
      ${tw`bg-subColor`}
    }
  }
`;

type menuProps = {
  active: boolean;
};
export const Menu = styled.button<menuProps>`
  ${tw`font-display font-normal text-sm mr-16 `}
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.subGray};
  cursor: ${(props) => (props.active ? "default" : "pointer")};

  position: relative;
  border: none;
  background: none;
  text-transform: uppercase;
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
