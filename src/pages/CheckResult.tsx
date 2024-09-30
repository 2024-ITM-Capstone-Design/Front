import CreateLayout from "../components/Common/CreateLayout";
import { useNavigate } from "react-router-dom";
import NextButton from "../components/Common/NextButton";
import tw from "twin.macro";
import styled from "styled-components";
function CheckResult() {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/");
  };
  return (
    <CreateLayout currentStep={3}>
      <ContentWrapper></ContentWrapper>
      <NextButton onClick={goToNextPage} />
    </CreateLayout>
  );
}

export default CheckResult;
const ContentWrapper = styled.div`
  ${tw`w-[829px] h-[619px] ml-6 bg-gray [border-radius: 15px] p-7 font-display flex flex-col`}
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .title-md {
    ${tw`font-semibold text-white text-md`}
  }
  .text-sm {
    ${tw`font-light text-subGray text-sm`}
  }
`;
