export type AnalysisResult = {
  id: number;
  segmentOrder: number;
  emotion: string | null;
  arousal: number | null;
  valence: number | null;
  octants: number | null;
};
