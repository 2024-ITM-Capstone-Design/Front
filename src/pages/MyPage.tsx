import React from "react";
import NavBar from "../components/Common/NavBar";
import tw from "twin.macro";
import styled from "styled-components";
import DefaultProfileImg from "../assets/default-profile.png";
import Ongoing from "../components/MyPage/Ongoing";
function MyPage() {
  return (
    <Layout>
      <NavBar menu="my-page" />
      <MainWrapper>
        <ProfileContainer>
          <img
            src={DefaultProfileImg}
            width={75}
            height={75}
            className="rounded-full"
          />
          <span className="nickname">Hello, eunji!</span>
        </ProfileContainer>
        <span className="section-label">Ongoing Musics</span>
        <Ongoing />
        <span className="section-label">Completed Arts</span>
      </MainWrapper>
    </Layout>
  );
}

export default MyPage;

const Layout = styled.div`
  ${tw`mx-auto w-full max-w-7xl `}
`;

const MainWrapper = styled.div`
  ${tw`flex flex-col w-full max-w-[1120px] mx-auto mt-[40px] font-display `}

  .section-label {
    ${tw`font-semibold text-[24px] text-white mt-[40px]`}
  }
`;

const ProfileContainer = styled.div`
  ${tw`w-full h-[110px] rounded-[20px] bg-[rgba(113, 101, 202, 0.6)] px-[25px] flex flex-row items-center gap-[15px]`}
  .nickname {
    ${tw`font-display font-semibold text-[40px] text-white `}
  }
`;
