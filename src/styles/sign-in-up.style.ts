import tw from "twin.macro";
import styled from "styled-components";

export const Wrapper = styled.div`
  ${tw`flex flex-row items-center justify-between mx-auto max-w-7xl mt-10 `}
`;

export const Logo = styled.span`
  ${tw`text-mainColor font-fira text-lg cursor-default mt-10 `}
`;
export const FormWrapper = styled.div`
  ${tw`bg-gray shadow-sm rounded-xl flex flex-col items-center `}
  margin: auto; /* Center horizontally and vertically */
  .navigate-btn {
    ${tw`rounded-lg h-11 w-2/3 border border-white inline-flex [align-items: center] justify-center m-auto`}
    .text {
      ${tw`text-white mx-1`}
    }
  }
`;

export const LoginLayout = styled(FormWrapper)`
  width: 450px;
  height: 500px;
  bottom: 50%;
  .login-title {
    ${tw`text-mainColor font-fira text-xl mb-10 mt-12`}
  }
`;

export const SignupLayout = styled(FormWrapper)`
  width: 450px;
  height: 610px;
  .sign-up-title {
    ${tw`text-mainColor font-fira text-xl mb-6 mt-10`}
  }
`;
export const FormLayout = styled.form`
  ${tw`w-80 flex flex-col`}
`;

type ErrorProps = {
  isError: boolean;
};

export const InputContainer = styled.div<ErrorProps>`
  ${tw`relative flex flex-col`}

  label {
    ${tw`font-display font-normal text-sm text-white`}
  }

  input {
    ${tw`w-full h-10 bg-white rounded-lg mt-1 mb-5 pl-0.5 font-display text-black text-xs placeholder:font-display`}

    border: ${(props) =>
      props.isError ? `2px solid ${props.theme.colors.error}` : "none"};

    &::placeholder {
      color: #b9b9ba;
      font-family: ${({ theme }) => theme.fonts.text_sm};
      padding-left: 8px;
    }
    &:focus {
      border: 2px solid ${({ theme }) => theme.colors.mainColor};
      outline: none;
    }
  }
  .error-message {
    ${tw`absolute w-full text-error font-display text-caption`}
    top: 80%;
    left: 0;
  }
`;

type ButtonProps = {
  isActivate: boolean;
};

export const Checkbtn = styled.button<ButtonProps>`
  ${tw`w-20 h-10  rounded-lg ml-1 mb-4 font-display text-white text-xs`}
  background-color:  ${(props) =>
    props.isActivate
      ? props.theme.colors.mainColor
      : props.theme.colors.subGray};
`;
export const Submitbtn = styled.button<ButtonProps>`
  ${tw` h-10 rounded-lg text-white font-fira my-3`}
  width: 100%;
  background-color: ${(props) =>
    props.isActivate
      ? props.theme.colors.mainColor
      : props.theme.colors.subGray};
`;
