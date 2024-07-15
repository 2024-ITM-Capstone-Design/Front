import tw from "twin.macro";
import styled from "styled-components";
export const Wrapper = tw.div`flex flex-row items-center justify-between mx-auto max-w-7xl mt-10 `;
export const Container = styled.div`
  ${tw`flex flex-row items-center`}

  .logo {
    ${tw`text-mainColor font-fira text-lg`}
  }
  .menu {
    ${tw`font-display font-normal text-sm text-white ml-32`}
  }

  .login-btn {
    ${tw`w-32 h-10 bg-mainColor rounded-lg text-white font-fira`}
  }
  .sign-up-btn {
    ${tw`w-32 h-10 box-border px-4 py-2  border border-mainColor rounded-lg text-mainColor ml-3 font-fira`}
  }
`;
