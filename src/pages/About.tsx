import { Card } from "../components/ui";

export default function About() {
  const steps = [
    "Image capture / upload",
    "Vegetable detection & counting",
    "Defect, freshness & ripeness analysis",
    "Score (0–100) and grade assignment",
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">About VegGrade AI</h1>
      <Card className="space-y-3 text-sm leading-relaxed">
        <p>
          <b>Problem:</b> Vegetable quality assessment, originally onion grading, is subjective and inconsistent
          across inspectors.
        </p>
        <p>
          <b>Solution:</b> VegGrade AI extends grading to 11 vegetables with vegetable-specific criteria, giving
          objective scores and Grade A/B/C/Reject results.
        </p>
        <p>
          <b>Current status:</b> Prototype with mock AI results. The <code>src/services/aiService.ts</code>{" "}
          interface lets a real computer-vision model (e.g. YOLO + classifier via a Python API) replace the mock
          with no UI changes.
        </p>
      </Card>
      <Card>
        <h2 className="mb-2 font-semibold">Pipeline</h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          {steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </Card>
    </div>
  );
}