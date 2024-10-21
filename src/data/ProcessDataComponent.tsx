import { AnalysisResult } from "../type/analysis-result";
import { InputData } from "../type/input-data";
import { formatTime } from "../utils/format-time";

type DataProps = {
  inputData: InputData;
  analysisResults: AnalysisResult[];
};
export const processMoodData = ({ inputData, analysisResults }: DataProps) => {
  // Define the properties
  const { type, duration } = inputData;

  // Extract mood based on type
  let mood: string[] = [];

  if (type === "ONE") {
    // Segment order 0의 mood만
    const segment = analysisResults.find((result) => result.segmentOrder === 0);
    if (segment && segment.emotion) {
      mood = [segment.emotion];
    }
  } else if (type === "MANY") {
    // Segment order 1부터 끝까지의 mood 값 배열
    mood = analysisResults
      .filter((result) => result.segmentOrder > 0)
      .map((result) => result.emotion)
      .filter((emotion): emotion is string => !!emotion); // null이 아닌 값을 필터링
  } else if (type === "BOTH") {
    // Segment order 0부터 끝까지의 mood 값 배열
    mood = analysisResults
      .map((result) => result.emotion)
      .filter((emotion): emotion is string => !!emotion); // null이 아닌 값을 필터링
  }

  return { type, duration, mood };
};

// data/ProcessDataComponent.ts
export const processGraphData = (analysisResults: any[], duration: number) => {
  const segmentDuration = 36; // 각 세그먼트의 길이 (초)
  const arousalData: { x: string; y: number }[] = [];
  const valenceData: { x: string; y: number }[] = [];

  analysisResults.forEach((result) => {
    // 각 세그먼트의 시작 시간 계산
    const segmentStart = (result.segmentOrder - 1) * segmentDuration;

    // 각 세그먼트의 종료 시간 계산
    const segmentEnd =
      result.segmentOrder === analysisResults.length
        ? duration // 마지막 세그먼트의 경우 전체 duration을 사용
        : Math.min(segmentStart + segmentDuration, duration);

    // 타임스탬프 형성
    const timeLabel = `${formatTime(segmentStart)}-${formatTime(segmentEnd)}`;

    // 각 세그먼트별 arousal 및 valence 데이터 추가
    if (result.arousal !== null) {
      arousalData.push({ x: timeLabel, y: result.arousal });
    }
    if (result.valence !== null) {
      valenceData.push({ x: timeLabel, y: result.valence });
    }
  });

  // 그래프 컴포넌트에 넘길 데이터 형태로 가공
  return [
    {
      id: "arousal",
      serieColor: "#FFF9C6",
      color: "#FFF9C6",
      pointColor: "#FFF9C6",
      data: arousalData,
    },
    {
      id: "valence",
      serieColor: "#F4B5FA",
      color: "#F4B5FA",
      pointColor: "#F4B5FA",
      data: valenceData,
    },
  ];
};
