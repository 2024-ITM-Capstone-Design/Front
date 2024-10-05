import CreateLayout from "../../components/Common/CreateLayout";
import { useNavigate, useParams } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import ViewGraph from "../../components/AnalysisResult/ViewGraph";
import ViewMood from "../../components/AnalysisResult/ViewMood";
import ViewSummary from "../../components/AnalysisResult/ViewSummary";
import NextButton from "../../components/Common/NextButton";
import { getAnalysisResult } from "../../api/create";
import { useQuery } from "@tanstack/react-query";
import {
  processGraphData,
  processMoodData,
} from "../../data/ProcessDataComponent";
import Loader from "../../components/Common/Loader";

type MoodData = {
  type: string;
  duration: number;
  mood: string[];
};

type GraphData = {
  id: string;
  serieColor: string;
  color: string;
  pointColor: string;
  data: { x: string; y: number }[];
}[];
function AnalysisResults() {
  const navigate = useNavigate();
  const { itemId } = useParams() as { itemId: string };
  const goToNextPage = () => {
    navigate("/create/check-result");
  };

  // Query to fetch analysis result
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAnalysisResult", itemId],
    queryFn: () => getAnalysisResult(itemId),
  });

  // Process the data if it exists
  let processedMoodData: MoodData | undefined;
  let graphData: GraphData | undefined;
  if (!isLoading && data) {
    processedMoodData = processMoodData(data);
    graphData = processGraphData(data.analysisResults, data.inputData.duration);
  }

  if (!isLoading && processMoodData !== undefined && graphData !== undefined) {
    return (
      <CreateLayout currentStep={2}>
        <ContentWrapper>
          <span className="title-md">Discover Music Insights</span>
          <span className="text-sm">
            Explore the insights of your song, including a concise summary, the
            Valence&Arousal derived from audio analysis, and the mood captured
            from the lyrics.
          </span>
          <ViewSummary content={data.inputData.audioIntro} />
          {/* 오디오, 가사 분석 */}
          <RowBox>
            <ViewGraph graphData={graphData} />
            <ViewMood
              type={processedMoodData!.type}
              duration={processedMoodData!.duration}
              mood={processedMoodData!.mood}
            />
          </RowBox>
        </ContentWrapper>
        <NextButton onClick={goToNextPage} />
      </CreateLayout>
    );
  } else {
    return (
      <CreateLayout currentStep={2}>
        <ContentWrapper>
          <Loader
            description={
              "Your song analysis is in progress, we're almost there..."
            }
          />
        </ContentWrapper>
      </CreateLayout>
    );
  }
}

export default AnalysisResults;
export const ContentWrapper = styled.div`
  ${tw`w-[829px]  ml-6 bg-gray [border-radius: 15px] p-7 font-display flex flex-col`}
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
