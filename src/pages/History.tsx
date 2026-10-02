import { Link } from "react-router-dom";
import { useHistory } from "../context/HistoryContext";
import { Card } from "../components/ui";

export default function History() {
  const { history, clear } = useHistory();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analysis History</h1>
        <button onClick={clear} className="rounded-lg border px-3 py-1.5 text-sm text-red-600">
          Clear all
        </button>
      </div>
      <Card className="overflow-x-auto">
        {history.length === 0 ? (
          <p className="text-slate-500">No analyses yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr>
                <th className="py-2">Date</th>
                <th>Vegetable</th>
                <th>Qty</th>
                <th>Score</th>
                <th>A/B/C/R</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="border-t">
                  <td className="py-2">{new Date(h.createdAt).toLocaleString()}</td>
                  <td>{h.vegetable}</td>
                  <td>{h.quantity}</td>
                  <td className="font-semibold">{h.overallScore}</td>
                  <td>
                    {h.counts.A}/{h.counts.B}/{h.counts.C}/{h.counts.Reject}
                  </td>
                  <td>
                    <Link to={`/result/${h.id}`} className="text-brand-600">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}