import React, { useState } from "react";
import NavBar from "../components/Common/NavBar";
import tw from "twin.macro";
import styled from "styled-components";
import DefaultProfileImg from "../assets/default-profile.png";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import OngoingList from "../components/MyPage/OngoingList";
import CompletedItemList from "../components/MyPage/CompletedItemList";
import MusicIcon from "../assets/icons/music-icon";
import InstaIcon from "../assets/icons/insta-icon";
function MyPage() {
  const { userData } = useAuthStore();

  const [selectedMenu, setSelectedMenu] = useState<number>(0);
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
          {userData && (
            <span className="nickname">{`Hello, ${userData.nickName}`}</span>
          )}
        </ProfileContainer>
        <span className="section-label">Ongoing Musics</span>
        <OngoingList />
        <span className="section-label">Completed Arts</span>
        <MenuBar>
          <MenuBtn
            $active={selectedMenu === 0}
            onClick={() => setSelectedMenu(0)}
          >
            <MusicIcon color={selectedMenu === 0 ? "#8D7EFD" : "#BDC0C4"} />
            Images
          </MenuBtn>

          <MenuBtn
            $active={selectedMenu === 1}
            onClick={() => setSelectedMenu(1)}
          >
            <InstaIcon color={selectedMenu === 1 ? "#8D7EFD" : "#BDC0C4"} />
            Videos
          </MenuBtn>
        </MenuBar>
        <CompletedItemList />
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

const MenuBar = styled.div`
  ${tw`w-full border-b-[1px] border-b-gray px-[228px] flex justify-between items-center py-1`}
`;

const MenuBtn = styled.div<{ $active: boolean }>`
  ${tw`flex flex-row items-center gap-0.5 border-none font-display text-base font-medium cursor-pointer`}

  ${({ $active }) => ($active ? tw`text-mainColor` : tw`text-subGray`)}
`;
