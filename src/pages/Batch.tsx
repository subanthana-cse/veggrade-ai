import { useState } from "react";
import { analyzer } from "../services/aiService";
import { useHistory } from "../context/HistoryContext";
import { Bar, Card, Stat } from "../components/ui";
import type { AnalysisResult } from "../types";

export default function Batch() {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { add } = useHistory();

  const run = async (files: FileList) => {
    setLoading(true);
    const out: AnalysisResult[] = [];
    for (const f of Array.from(files)) {
      const r = await analyzer.analyze(f);
      add(r);
      out.push(r);
    }
    setResults(out);
    setLoading(false);
  };

  const total = results.reduce((s, r) => s + r.quantity, 0);
  const g = (k: "A" | "B" | "C" | "Reject") => results.reduce((s, r) => s + r.counts[k], 0);
  const avg = results.length ? Math.round(results.reduce((s, r) => s + r.overallScore, 0) / results.length) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Batch Analysis</h1>
      <Card>
        <label className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed text-slate-500 hover:bg-slate-50">
          {loading ? "Analyzing batch…" : "Select multiple images"}
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            disabled={loading}
            onChange={(e) => e.target.files && run(e.target.files)}
          />
        </label>
      </Card>

      {results.length > 0 && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Images" value={results.length} />
            <Stat label="Total Vegetables" value={total} />
            <Stat label="Average Score" value={`${avg}/100`} />
            <Stat label="Reject Rate" value={`${Math.round((g("Reject") / total) * 100)}%`} />
          </div>
          <Card className="space-y-3">
            <h2 className="font-semibold">Grade distribution</h2>
            <Bar label="Grade A" value={g("A")} max={total} />
            <Bar label="Grade B" value={g("B")} max={total} color="bg-lime-500" />
            <Bar label="Grade C" value={g("C")} max={total} color="bg-amber-500" />
            <Bar label="Reject" value={g("Reject")} max={total} color="bg-red-500" />
          </Card>
        </>
      )}
    </div>
  );
}