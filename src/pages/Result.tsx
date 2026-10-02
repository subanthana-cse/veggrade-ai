import { Link, useLocation, useParams } from "react-router-dom";
import { useHistory } from "../context/HistoryContext";
import { VEGETABLES } from "../data/vegetables";
import { Bar, Card, GradeBadge, ScoreRing, Stat } from "../components/ui";
import type { AnalysisResult, Grade } from "../types";

const boxColor: Record<Grade, string> = {
  A: "#22c55e",
  B: "#84cc16",
  C: "#f59e0b",
  Reject: "#ef4444",
};

const verdict = (s: number) =>
  s >= 80 ? ["Grade A: Premium", "text-green-600"] :
  s >= 65 ? ["Grade B: Good", "text-lime-600"] :
  s >= 50 ? ["Grade C: Average", "text-amber-600"] :
  ["Reject: Poor quality", "text-red-600"];

export default function Result() {
  const { id } = useParams();
  const { state } = useLocation();
  const { history } = useHistory();
  const r: AnalysisResult | undefined = (state as AnalysisResult) ?? history.find((h) => h.id === id);

  if (!r)
    return (
      <p>
        Result not found.{" "}
        <Link to="/scanner" className="text-brand-600">Scan again</Link>
      </p>
    );

  const veg = VEGETABLES.find((v) => v.name === r.vegetable)!;
  const [vText, vColor] = verdict(r.overallScore);
  const cols = Math.ceil(Math.sqrt(r.items.length));
  const rows = Math.ceil(r.items.length / cols);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">{veg.emoji} Quality Analysis: {r.vegetable}</h1>
        <Link to="/scanner" className="rounded-xl bg-gradient-to-r from-green-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white">
          + New Scan
        </Link>
      </div>

      <div className={`flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br ${veg.gradient} p-6 text-white shadow-lg sm:flex-row`}>
        <div className="rounded-3xl bg-white p-4 shadow-xl"><ScoreRing score={r.overallScore} /></div>
        <div className="text-center sm:text-left">
          <div className="text-7xl drop-shadow-lg">{veg.emoji}</div>
          <h2 className="mt-1 text-3xl font-extrabold">{r.vegetable}</h2>
          <p className="mt-1 inline-block rounded-full bg-white px-3 py-1 text-sm font-bold"><span className={vColor}>{vText}</span></p>
          <p className="mt-2 text-sm text-white/90">{r.quantity} items detected · Shelf life: {veg.shelf}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Grade A" value={r.counts.A} sub="Premium items" />
        <Stat label="Grade B" value={r.counts.B} sub="Good items" />
        <Stat label="Grade C" value={r.counts.C} sub="Average items" />
        <Stat label="Rejected" value={r.counts.Reject} sub="Defective items" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 font-semibold">🔍 Detection view</h2>
          <div className="relative overflow-hidden rounded-xl bg-slate-100">
            {r.image ? (
              <img src={r.image} alt="Analyzed" className="block w-full" />
            ) : (
              <div className={`flex aspect-video items-center justify-center bg-gradient-to-br ${veg.gradient} text-8xl opacity-80`}>
                {veg.emoji}
              </div>
            )}
            {r.items.map((it, i) => {
              const cw = 100 / cols;
              const ch = 100 / rows;
              return (
                <div
                  key={it.id}
                  className="absolute rounded-md border-2"
                  style={{
                    left: `${(i % cols) * cw + cw * 0.08}%`,
                    top: `${Math.floor(i / cols) * ch + ch * 0.08}%`,
                    width: `${cw * 0.84}%`,
                    height: `${ch * 0.84}%`,
                    borderColor: boxColor[it.grade],
                  }}
                >
                  <span className="absolute -top-0 left-0 rounded-br-md px-1 text-[10px] font-bold text-white" style={{ background: boxColor[it.grade] }}>
                    #{it.id} {it.grade}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-slate-400">Demo boxes. A real AI model will return exact positions.</p>
        </Card>

        <Card className="space-y-3">
          <h2 className="font-semibold">📋 {r.vegetable}-specific criteria</h2>
          {r.criteria.map((c) => (
            <Bar
              key={c.label}
              label={c.label}
              value={c.value}
              color={c.value >= 80 ? "bg-green-500" : c.value >= 65 ? "bg-lime-500" : c.value >= 50 ? "bg-amber-500" : "bg-red-500"}
            />
          ))}
        </Card>

        <Card>
          <h2 className="mb-2 font-semibold">⚠️ Detected Issues</h2>
          {r.issues.length ? (
            <div className="flex flex-wrap gap-2">
              {r.issues.map((i) => (
                <span key={i} className="rounded-full bg-red-50 px-3 py-1 text-sm text-red-700 ring-1 ring-red-200">{i}</span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-green-600">✅ No issues found.</p>
          )}
          <h2 className="mb-1 mt-5 font-semibold">💡 Recommendation</h2>
          <p className="text-sm text-slate-600">
            {r.overallScore >= 80
              ? "Excellent lot. Suitable for premium market and export."
              : r.overallScore >= 65
              ? "Good lot. Sell in local market, remove Grade C and rejected items first."
              : r.overallScore >= 50
              ? "Average lot. Sort carefully and sell quickly, or use for processing."
              : "Poor lot. Not suitable for fresh sale. Consider processing or disposal."}
          </p>
        </Card>

        <Card className="overflow-x-auto">
          <h2 className="mb-2 font-semibold">🧾 Per-item results</h2>
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr><th>#</th><th>Score</th><th>Grade</th><th>Issues</th></tr>
            </thead>
            <tbody>
              {r.items.map((i) => (
                <tr key={i.id} className="border-t">
                  <td className="py-1">{i.id}</td>
                  <td>{i.score}</td>
                  <td><GradeBadge grade={i.grade} /></td>
                  <td>{i.issues.join(", ") || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}