import { VEGETABLES } from "../data/vegetables";
import type { AnalysisResult, DetectedItem, Grade } from "../types";

/** Swap this implementation with a real CV model / REST API later. */
export interface VegetableAnalyzer {
  analyze(image: Blob, hint?: string): Promise<AnalysisResult>;
}

const rand = (a: number, b: number) => Math.floor(a + Math.random() * (b - a + 1));
const toGrade = (s: number): Grade => (s >= 80 ? "A" : s >= 65 ? "B" : s >= 50 ? "C" : "Reject");

export function mockResult(vegName?: string, daysAgo = 0): AnalysisResult {
  const veg = VEGETABLES.find((v) => v.name === vegName) ?? VEGETABLES[rand(0, VEGETABLES.length - 1)];
  const quantity = rand(4, 12);
  const items: DetectedItem[] = Array.from({ length: quantity }, (_, i) => {
    const score = Math.min(100, Math.max(15, rand(40, 100) + 8));
    const grade = toGrade(score);
    const issues = grade === "A" ? [] : [veg.issues[rand(0, veg.issues.length - 1)]];
    return { id: i + 1, grade, score, issues };
  });
  const counts: Record<Grade, number> = { A: 0, B: 0, C: 0, Reject: 0 };
  items.forEach((i) => counts[i.grade]++);
  const issueMap: Record<string, number> = {};
  items.forEach((i) => i.issues.forEach((x) => (issueMap[x] = (issueMap[x] || 0) + 1)));
  return {
    id: crypto.randomUUID(),
    vegetable: veg.name,
    createdAt: new Date(Date.now() - daysAgo * 86400000).toISOString(),
    quantity,
    items,
    counts,
    overallScore: Math.round(items.reduce((s, i) => s + i.score, 0) / quantity),
    issues: Object.entries(issueMap).map(([k, n]) => `${n} ${k}${n > 1 ? "s" : ""}`),
    criteria: veg.criteria.map((label) => ({ label, value: rand(55, 98) })),
  };
}

/** Offline fallback: generates mock data in the browser. */
class MockAnalyzer implements VegetableAnalyzer {
  async analyze(image: Blob, hint?: string) {
    await new Promise((r) => setTimeout(r, 1500)); // simulate inference latency
    const res = mockResult(hint);
    res.image = URL.createObjectURL(image);
    return res;
  }
}

const API_URL = "http://localhost:8000";

/** Calls the Python backend. If the backend is off, falls back to mock data. */
class ApiAnalyzer implements VegetableAnalyzer {
  async analyze(image: Blob, hint?: string) {
    try {
      const form = new FormData();
      form.append("file", image, "upload.jpg");
      if (hint) form.append("hint", hint);
      const res = await fetch(`${API_URL}/analyze`, { method: "POST", body: form });
      if (!res.ok) throw new Error("API error");
      const data: AnalysisResult = await res.json();
      data.image = URL.createObjectURL(image);
      return data;
    } catch {
      console.warn("Backend not reachable, using mock analyzer");
      return new MockAnalyzer().analyze(image, hint);
    }
  }
}

export const analyzer: VegetableAnalyzer = new ApiAnalyzer();