import tw from "twin.macro";
import styled from "styled-components";

export const Wrapper = styled.div`
  ${tw`flex flex-row items-center justify-between mx-auto max-w-7xl mt-10 `}

  .logo {
    ${tw`text-mainColor font-fira text-lg cursor-default`}
  }
`;

export const FormWrapper = styled.div`
  ${tw`bg-gray shadow-sm rounded-xl mx-auto mt-8 flex flex-col items-center`}

  .title {
    ${tw`text-mainColor font-fira text-lg mt-20`}
  }
  .navigate-btn {
    ${tw`rounded-lg h-11 w-2/3 border border-white inline-flex [align-items: center] justify-center m-auto`}
    .text {
      ${tw`text-white mx-1`}
    }
  }
`;

export const LoginLayout = styled(FormWrapper)`
  width: 450px;
  height: 580px;
`;

export const FormLayout = styled.form`
  ${tw`w-80 mt-10`}

  label {
    ${tw`font-display font-normal text-sm text-white`}
  }

  input {
    ${tw`w-full h-10 bg-white rounded-lg mt-1 mb-3 placeholder:font-display`}
    &::placeholder {
      color: #b9b9ba;
      font-family: ${({ theme }) => theme.fonts.text_sm};
      padding-left: 20px;
    }
  }
`;

export const Submitbtn = styled.button`
  ${tw` h-10 rounded-lg text-white font-fira my-3`}
  width: 100%;
  background: ${(props) => props.theme.colors.mainColor};
`;
