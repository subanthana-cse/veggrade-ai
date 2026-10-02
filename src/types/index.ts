export type Grade = "A" | "B" | "C" | "Reject";

export interface DetectedItem {
  id: number;
  grade: Grade;
  score: number;
  issues: string[];
}

export interface AnalysisResult {
  id: string;
  vegetable: string;
  createdAt: string;
  image?: string;
  quantity: number;
  items: DetectedItem[];
  counts: Record<Grade, number>;
  overallScore: number;
  issues: string[];
  criteria: { label: string; value: number }[];
}