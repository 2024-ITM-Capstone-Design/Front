import React, { useState } from "react";
import CreateLayout from "../components/CreateLayout";
import Progress from "../components/Create/Progress";
import * as C from "../styles/create.style";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as Camera } from "../assets/camera.svg";
import { ReactComponent as Player } from "../assets/player.svg";
function ServiceSelection() {
  const navigate = useNavigate();

  const [selectedOne, setSelectedOne] = useState<boolean>(false);
  const [selectedMany, setSelectedMany] = useState<boolean>(false);
  console.log(selectedOne, selectedMany);

  const goToNextPage = () => {
    //두 서비스 모두 선택
    if (selectedOne && selectedMany) {
      navigate("/create/file-upload", {
        state: {
          menu: "both",
        },
      });
    }
    //단일이미지만 선택
    else if (selectedOne && !selectedMany) {
      navigate("/create/file-upload", {
        state: {
          menu: "one",
        },
      });
    }
    //여러 이미지 선택
    else if (!selectedOne && selectedMany) {
      navigate("/create/file-upload", {
        state: {
          menu: "many",
        },
      });
    }
  };

  return (
    <CreateLayout>
      <Progress currentStep={0} />
      <div className="flex flex-col items-end">
        <C.ContentWrapper>
          <label className="title-md">서비스선택</label>
          <label className="text-sm">
            제공받기를 원하는 서비스를 선택해주세요. 복수 선택도 가능해요.
          </label>
          <C.RowBox className="mt-12 mx-auto w-[650px] justify-between">
            <ButtonWrapper
              active={selectedOne}
              onClick={() => setSelectedOne(!selectedOne)}
            >
              <Camera />
              <label className="title-md my-3">커버 이미지 생성</label>
              <label className="text-sm">
                내 음악 맞춤형 커버사진을 생성하고,
              </label>
              <label className="text-sm">
                생성된 이미지를 다운로드할 수 있어요
              </label>
            </ButtonWrapper>
            <ButtonWrapper
              active={selectedMany}
              onClick={() => setSelectedMany(!selectedMany)}
            >
              <Player />
              <label className="title-md mb-3">구간별 이미지 생성</label>
              <label className="text-sm">
                음악의 각 구간에 맞춤형 이미지를 생성하고,
              </label>
              <label className="text-sm">
                다양한 이미지를 다운로드할 수 있어요
              </label>
            </ButtonWrapper>
          </C.RowBox>
        </C.ContentWrapper>
        <C.NextButton
          onClick={goToNextPage}
          disabled={!selectedOne && !selectedMany}
        >
          Next →
        </C.NextButton>
      </div>
    </CreateLayout>
  );
}

export default ServiceSelection;

const ButtonWrapper = styled.button<{ active: boolean }>`
  ${tw`flex flex-col items-center w-[305px] h-[355px] [border-radius: 5px] border-[1px] justify-center`}

  ${({ active }) =>
    active
      ? tw`bg-[linear-gradient(90deg, rgba(113, 100, 200, 0.5) 0%, rgba(55, 49, 98, 0.5) 100%)] border-[#8D7EFD] `
      : tw`border-subGray `}

    &:hover {
    ${({ active }) => (active ? tw`bg-[#554F80]` : tw`bg-[#333236] `)}


`;
