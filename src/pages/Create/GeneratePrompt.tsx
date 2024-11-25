import tw from "twin.macro";
import styled from "styled-components";
import CreateLayout from "../../components/Common/CreateLayout";
import PencilSvg from "../../assets/pencil.svg?react";
import { useCallback, useState } from "react";
import ImageStyle from "../../components/GeneratePrompt/ImageStyle";
import ProtogonistOption from "../../components/GeneratePrompt/ProtogonistOption";
import NextButton from "../../components/Common/NextButton";
import ProtogonistForm from "../../components/GeneratePrompt/ProtogonistForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendImageOption } from "../../api/create";
import { useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const [selectedImageOption, setSelectedImageOption] = useState<string>("");
  const [selectedPromptOption, setSelectedPromptOption] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { itemId } = useParams() as { itemId: string };
  const { register, handleSubmit, watch } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      console.log("Form Data:", data);
      setIsLoading(true);

      const isAutomatic = selectedPromptOption === "AUTO";
      let script = "";

      if (selectedPromptOption === "CUSTOM") {
        script = `Age: ${data.AGE} Gender: ${data.GENDER} Physical Appearance:  Eye color: ${data.EYE_COLOR} , Hair: ${data.HAIR}, Skin tone: ${data.SKIN_TONE},  Facial features: ${data.FEATURES}
          Clothing: Style: ${data.STYLE}, Color: ${data.COLOR_SCHEME} `;
        console.log(script);
      }

      // 선택된 옵션 값이 있을 때만 API 호출
      if (selectedImageOption && selectedPromptOption) {
        const res = await sendImageOption(
          itemId,
          selectedImageOption,
          isAutomatic,
          script
        );

        if (res) {
          navigate(`/create/view-result/${itemId}`);
        }
      }
    },
    [selectedImageOption, selectedPromptOption]
  );

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
        selectedImageOption === "" ||
        !AGE ||
        !GENDER ||
        !STYLE ||
        !COLOR_SCHEME ||
        !EYE_COLOR ||
        !HAIR ||
        !SKIN_TONE ||
        !FEATURES
      );
    }
    return selectedImageOption === "" || selectedPromptOption === "";
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
            selectedImageOption={selectedImageOption}
            setSelectedImageOption={setSelectedImageOption}
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
            selectedPromptOption={selectedPromptOption}
            setSelectedPromptOption={setSelectedPromptOption}
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
        disabled={checkValues() || isLoading}
      >
        {isLoading ? (
          <div className="w-7 h-7 border-4 border-t-gray border-subGray rounded-full animate-spin"></div>
        ) : (
          "Next →"
        )}
      </NextButton>
    </CreateLayout>
  );
}

export default GeneratePrompt;

const ContentWrapper = styled.div`
  ${tw`w-full bg-gray [border-radius: 15px] p-7 font-display flex flex-col`}
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .title-md {
    ${tw`font-semibold text-white text-md`}
  }
  .text-sm {
    ${tw`font-light text-subGray text-sm`}
  }
`;
const Container = styled.div`
  ${tw`w-full p-[20px] rounded-[16px] bg-black flex flex-col m-auto mt-5`}
  .main-text {
    ${tw`font-normal text-sm text-white`}
  }
  .desc {
    ${tw`font-light text-sm text-subGray mt-[5px]`}
  }
`;
