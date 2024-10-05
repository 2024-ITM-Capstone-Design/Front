import tw from "twin.macro";
import styled from "styled-components";
import CreateLayout from "../../components/Common/CreateLayout";
import { ReactComponent as PencilSvg } from "../../assets/pencil.svg";
import { useState } from "react";
import ImageStyle from "../../components/GeneratePrompt/ImageStyle";
import ProtogonistOption from "../../components/GeneratePrompt/ProtogonistOption";
import NextButton from "../../components/Common/NextButton";
import ProtogonistForm from "../../components/GeneratePrompt/ProtogonistForm";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  AGE: string;
  GENDER: string;
  STYLE: string;
  COLOR_SCHEME: string;
  EYE_COLOR: string;
  HAIR: string;
  SKIN_TONE: string;
  FEATURES: string;
};
function GeneratePrompt() {
  const [selectedImageOption, setSelectedImageOption] = useState<string | null>(
    null
  );
  const [selectedPromptOption, setSelectedPromptOption] = useState<
    string | null
  >(null);

  const { register, handleSubmit, getValues, watch } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
    console.log("Selected Image Option:", selectedImageOption);
    console.log("Selected Protagonist Option:", selectedPromptOption);
    if (selectedPromptOption === "CUSTOM") {
      let script = `Age: ${data.AGE} Gender: ${data.GENDER} 
      Physical Appearance: 
      - Eye color: ${data.EYE_COLOR}
      - Hair: ${data.HAIR}
      - Skin tone: ${data.SKIN_TONE}
      - Facial features: ${data.FEATURES}
      Clothing:
      - Style: ${data.STYLE}
      - Color: ${data.COLOR_SCHEME} `;
      console.log(script);
    }
  };

  const checkValues = () => {
    if (selectedPromptOption === "CUSTOM") {
      const {
        AGE,
        GENDER,
        STYLE,
        COLOR_SCHEME,
        EYE_COLOR,
        HAIR,
        SKIN_TONE,
        FEATURES,
      } = watch();
      return (
        !AGE ||
        !GENDER ||
        !STYLE ||
        !COLOR_SCHEME ||
        !EYE_COLOR ||
        !HAIR ||
        !SKIN_TONE ||
        !FEATURES
      );
    } else {
      return !selectedImageOption || !selectedPromptOption;
    }
  };
  return (
    <CreateLayout currentStep={3}>
      <ContentWrapper>
        <label className="title-md">Generate Image Prompt</label>
        <label className="text-sm">
          Set your protagonist and choose an image style to create visuals that
          match your music perfectly. Your imagination, our creation.
        </label>
        <Container>
          {/* 이미지 스타일 설정 */}
          <div className="flex gap-2 items-center">
            <PencilSvg />
            <span className="main-text">Setup Image Style</span>
          </div>
          <span className="desc">
            How would you like your image to look? Choose a style that captures
            the vibe of your music
          </span>
          <ImageStyle
            selectedOption={selectedImageOption}
            setSelectedOption={setSelectedImageOption}
          />

          <div className="h-7"></div>

          {/* 주인공 설정 */}
          <div className="flex gap-2 items-center">
            <PencilSvg />
            <span className="main-text">Setup Protagonist </span>
          </div>
          <span className="desc">
            Would you like to set up the protagonist automatically or manually?
          </span>

          <ProtogonistOption
            selectedOption={selectedPromptOption}
            setSelectedOption={setSelectedPromptOption}
          />

          {/* 주인공 설정 폼 */}

          <form>
            {selectedPromptOption === "CUSTOM" && (
              <ProtogonistForm register={register} />
            )}
          </form>
        </Container>
      </ContentWrapper>
      <NextButton
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={checkValues()}
      />
    </CreateLayout>
  );
}

export default GeneratePrompt;

const ContentWrapper = styled.div`
  ${tw`w-[829px] ml-6 bg-gray [border-radius: 15px] p-7 font-display flex flex-col`}
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .title-md {
    ${tw`font-semibold text-white text-md`}
  }
  .text-sm {
    ${tw`font-light text-subGray text-sm`}
  }
`;
const Container = styled.div`
  ${tw`w-[743px] p-[20px] rounded-[16px] bg-black flex flex-col m-auto mt-5`}
  .main-text {
    ${tw`font-normal text-sm text-white`}
  }
  .desc {
    ${tw`font-light text-sm text-subGray mt-[5px]`}
  }
`;
