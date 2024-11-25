import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

type OptionProps = {
  selectedPromptOption: string;
  setSelectedPromptOption: React.Dispatch<React.SetStateAction<string>>;
};
function ProtogonistOption({
  selectedPromptOption,
  setSelectedPromptOption,
}: OptionProps) {
  return (
    <OptionBox>
      <OptionBtn
        $active={selectedPromptOption === "AUTO"}
        option="left"
        onClick={() => setSelectedPromptOption("AUTO")}
      >
        automatically
      </OptionBtn>
      <OptionBtn
        $active={selectedPromptOption === "CUSTOM"}
        option="right"
        onClick={() => setSelectedPromptOption("CUSTOM")}
      >
        manually
      </OptionBtn>
    </OptionBox>
  );
}

export default React.memo(ProtogonistOption);

const OptionBox = styled.div`
  ${tw`flex mt-2.5`}
`;
const OptionBtn = styled.button<{ $active: boolean; option: string }>`
  ${tw`w-[334px] h-[45px] font-normal font-display border-[1px]`}

  ${({ option }) =>
    option === "left" ? tw`rounded-l-[5px]` : tw`rounded-r-[5px]`}

  ${({ $active }) =>
    $active
      ? tw`bg-[rgba(113, 101, 202, 0.6)] border-mainColor border-r-subGray text-white`
      : tw`border-subGray text-subGray bg-gray`}
`;
