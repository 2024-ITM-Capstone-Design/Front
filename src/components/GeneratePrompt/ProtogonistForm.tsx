import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import InputBox from "./InputBox";

function ProtogonistForm({ register }: { register: any }) {
  return (
    <Container>
      <div className="w-full h-full flex flex-col justify-between">
        <div className="tag">Basic Information</div>
        <InputBox
          title="Age"
          example="(e.g., Child, Teenager, Adult, Elderly)"
          id="AGE"
          register={register}
        />
        <InputBox
          title="Gender"
          example="(e.g., Female, Male)"
          id="GENDER"
          register={register}
        />
        <div className="tag">Clothing</div>

        <InputBox
          title="Style"
          example="(e.g., Casual, Formal, Fantasy, Futuristic)"
          id="STYLE"
          register={register}
        />

        <InputBox
          title="Color Scheme"
          example="(e.g., Earth tones, Bright colors)"
          id="COLOR_SCHEME"
          register={register}
        />
      </div>
      <div className="w-[1px] h-full bg-subGray" />
      <div className="w-full h-full flex flex-col justify-between">
        <div className="tag">Physical Appearance</div>
        <InputBox
          title="Eye Color"
          example="(e.g., Blue, Green, Brown)"
          id="EYE_COLOR"
          register={register}
        />
        <InputBox
          title="Hair Style and Color"
          example="(e.g., Long and wavy, short and straight)"
          id="HAIR"
          register={register}
        />
        <InputBox
          title="Skin Tone"
          example="(e.g., Fair, Medium, Dark)"
          id="SKIN_TONE"
          register={register}
        />
        <InputBox
          title="Facial Features"
          example="(e.g., Prominent cheekbones, freckles, scars)"
          id="FEATURES"
          register={register}
        />
      </div>
    </Container>
  );
}

export default React.memo(ProtogonistForm);

const Container = styled.div`
  ${tw`w-[669px] h-[406px] flex p-4 items-center gap-[20px] border-[1px] border-subGray rounded-[5px] mt-5 font-display`}
  .tag {
    ${tw`w-[154px] h-[30px] rounded-[20px] bg-gray font-light text-xs text-white px-[16px] flex items-center justify-center`}
  }
`;
