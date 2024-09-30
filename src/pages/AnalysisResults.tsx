import CreateLayout from "../components/Common/CreateLayout";
import { useNavigate, useParams } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import ViewGraph from "../components/AnalysisResult/ViewGraph";
import ViewMood from "../components/AnalysisResult/ViewMood";
import { ReactComponent as PlayListIcon } from "../assets/playlist-icon.svg";
import ViewSummary from "../components/AnalysisResult/ViewSummary";
import NextButton from "../components/Common/NextButton";
function AnalysisResults() {
  const navigate = useNavigate();
  const { itemId } = useParams() as { itemId: string };
  const goToNextPage = () => {
    navigate("/create/check-result");
  };
  return (
    <CreateLayout currentStep={2}>
      <ContentWrapper>
        <span className="title-md">Discover Music Insights</span>
        <span className="text-sm">
          Explore the insights of your song, including a concise summary, the
          Valence&Arousal derived from audio analysis, and the mood captured
          from the lyrics.
        </span>
        <ViewSummary />
        {/* 오디오, 가사 분석 */}
        <RowBox>
          <ViewGraph />
          <ViewMood />
        </RowBox>
      </ContentWrapper>
      <NextButton onClick={goToNextPage} />
    </CreateLayout>
  );
}

export default AnalysisResults;
export const ContentWrapper = styled.div`
  ${tw`w-[829px] h-[630px] ml-6 bg-gray [border-radius: 15px] p-7 font-display flex flex-col`}
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .title-md {
    ${tw`font-semibold text-white text-md`}
  }
  .text-sm {
    ${tw`font-light text-subGray text-sm`}
  }
`;

export const RowBox = styled.div`
  ${tw`w-full gap-[20px] flex flex-row items-center mt-4`}
`;
