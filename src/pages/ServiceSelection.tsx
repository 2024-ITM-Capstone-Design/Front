import React, { useState } from "react";
import CreateLayout from "../components/Common/CreateLayout";
import Progress from "../components/Progress";
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
          menu: "BOTH",
        },
      });
    }
    //단일이미지만 선택
    else if (selectedOne && !selectedMany) {
      navigate("/create/file-upload", {
        state: {
          menu: "ONE",
        },
      });
    }
    //여러 이미지 선택
    else if (!selectedOne && selectedMany) {
      navigate("/create/file-upload", {
        state: {
          menu: "MANY",
        },
      });
    }
  };

  return (
    <CreateLayout>
      <Progress currentStep={0} />
      <div className="flex flex-col items-end">
        <C.ContentWrapper>
          <label className="title-md">Service Selection</label>
          <label className="text-sm">
            Please select the service you want to receive. You can select
            multiple options.
          </label>
          <C.RowBox className="mt-12 mx-auto w-[650px] justify-between">
            <ButtonWrapper
              active={selectedOne}
              onClick={() => setSelectedOne(!selectedOne)}
            >
              <Camera />
              <div className="h-[100px] flex flex-col items-center">
                <label className="title-md my-2 w-[150px]">
                  Cover Image Generation
                </label>
                <label className="text-sm">Generate a custom cover image</label>
                <label className="text-sm">
                  for your music, and download it.
                </label>
              </div>
            </ButtonWrapper>
            <ButtonWrapper
              active={selectedMany}
              onClick={() => setSelectedMany(!selectedMany)}
            >
              <Player />
              <div className="h-[100px] flex flex-col items-center">
                <label className="title-md my-2">
                  Section-Based Image Generation
                </label>
                <label className="text-sm">Generate custom images</label>
                <label className="text-sm">
                  for each section of the music{" "}
                </label>
              </div>
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
