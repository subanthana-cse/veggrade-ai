import { useHistory } from "../context/HistoryContext";
import { VEGETABLES } from "../data/vegetables";
import { Bar, Card, Stat } from "../components/ui";

export default function Dashboard() {
  const { history } = useHistory();
  const total = history.reduce((s, h) => s + h.quantity, 0);
  const g = (k: "A" | "B" | "C" | "Reject") => history.reduce((s, h) => s + h.counts[k], 0);
  const avg = history.length ? Math.round(history.reduce((s, h) => s + h.overallScore, 0) / history.length) : 0;

  const perVeg = VEGETABLES.map((v) => {
    const list = history.filter((h) => h.vegetable === v.name);
    return {
      ...v,
      scans: list.length,
      avg: list.length ? Math.round(list.reduce((s, h) => s + h.overallScore, 0) / list.length) : 0,
    };
  }).filter((v) => v.scans);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Scans" value={history.length} />
        <Stat label="Vegetables Graded" value={total} />
        <Stat label="Average Quality" value={`${avg}/100`} />
        <Stat label="Reject Rate" value={`${total ? Math.round((g("Reject") / total) * 100) : 0}%`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-3">
          <h2 className="font-semibold">Grade distribution</h2>
          <Bar label="Grade A" value={g("A")} max={total || 1} />
          <Bar label="Grade B" value={g("B")} max={total || 1} color="bg-lime-500" />
          <Bar label="Grade C" value={g("C")} max={total || 1} color="bg-amber-500" />
          <Bar label="Reject" value={g("Reject")} max={total || 1} color="bg-red-500" />
        </Card>

        <Card className="space-y-3">
          <h2 className="font-semibold">Average score by vegetable</h2>
          {perVeg.map((v) => (
            <Bar key={v.name} label={`${v.emoji} ${v.name} (${v.scans} scans)`} value={v.avg} />
          ))}
          {!perVeg.length && <p className="text-sm text-slate-500">No data yet.</p>}
        </Card>
      </div>
    </div>
  );
}