import { Link } from "react-router-dom";
import { VEGETABLES } from "../data/vegetables";
import { Card } from "../components/ui";

const features = [
  ["📷", "Scan anywhere", "Upload an image or use your camera.", "from-sky-400 to-blue-600"],
  ["🔍", "Multi-detection", "Grade many vegetables in one image.", "from-fuchsia-400 to-purple-600"],
  ["📊", "Objective scores", "0-100 score with Grade A/B/C/Reject.", "from-amber-400 to-orange-600"],
  ["📦", "Batch insights", "Statistics for whole lots.", "from-emerald-400 to-green-600"],
];

const steps = [
  ["1", "Capture", "Take a photo or upload an image of your vegetables."],
  ["2", "Analyze", "AI detects each vegetable, checks freshness and defects."],
  ["3", "Grade", "Get a 0-100 score and Grade A, B, C or Reject."],
];

const stats = [["11", "Vegetables"], ["4", "Grade levels"], ["100", "Point score"], ["<2s", "Analysis time"]];

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 via-emerald-600 to-teal-800 px-6 py-16 text-center text-white shadow-xl">
        <div className="pointer-events-none absolute -right-8 -top-8 text-[10rem] opacity-20">🥬</div>
        <div className="pointer-events-none absolute -bottom-8 -left-4 text-[9rem] opacity-20">🍅</div>
        <div className="pointer-events-none absolute right-1/4 bottom-0 text-[7rem] opacity-20">🥕</div>
        <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-medium">Smart India Hackathon Project</span>
        <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
          AI-Powered Vegetable<br />Quality Grading
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-green-50">
          Replace subjective manual inspection with consistent, vegetable-specific quality assessment for 11 crops.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-3xl">
          {VEGETABLES.map((v) => <span key={v.name}>{v.emoji}</span>)}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/scanner" className="rounded-xl bg-white px-7 py-3 font-semibold text-green-700 shadow hover:bg-green-50">
            📷 Start Scanning
          </Link>
          <Link to="/dashboard" className="rounded-xl border border-white/60 px-7 py-3 font-semibold hover:bg-white/10">
            View Dashboard
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(([n, l]) => (
          <div key={l} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-200">
            <p className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-4xl font-extrabold text-transparent">{n}</p>
            <p className="text-sm text-slate-500">{l}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-6 text-center text-2xl font-bold">🥗 Supported vegetables</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {VEGETABLES.map((v) => (
            <Link
              key={v.name}
              to="/scanner"
              className={`group rounded-2xl bg-gradient-to-br ${v.gradient} p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="text-7xl drop-shadow-lg transition group-hover:scale-110">{v.emoji}</div>
              <h3 className="mt-3 text-lg font-bold">{v.name}</h3>
              <p className="text-xs text-white/85">{v.desc}</p>
              <p className="mt-2 inline-block rounded-full bg-white/25 px-2 py-0.5 text-xs">Shelf life: {v.shelf}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-center text-2xl font-bold">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map(([n, t, d]) => (
            <Card key={n} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-600 text-lg font-bold text-white">{n}</div>
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="text-sm text-slate-500">{d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(([i, t, d, g]) => (
          <div key={t} className={`rounded-2xl bg-gradient-to-br ${g} p-5 text-white shadow-md transition hover:-translate-y-1`}>
            <div className="text-4xl">{i}</div>
            <h3 className="mt-2 font-semibold">{t}</h3>
            <p className="text-sm text-white/85">{d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}