import type { ReactNode } from "react";
import type { Grade } from "../types";

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>
);

const gradeColor: Record<Grade, string> = {
  A: "bg-green-100 text-green-700",
  B: "bg-lime-100 text-lime-700",
  C: "bg-amber-100 text-amber-700",
  Reject: "bg-red-100 text-red-700",
};

export const GradeBadge = ({ grade }: { grade: Grade }) => (
  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${gradeColor[grade]}`}>
    {grade === "Reject" ? "Reject" : `Grade ${grade}`}
  </span>
);

const tones = [
  "from-emerald-500 to-green-600",
  "from-orange-400 to-red-500",
  "from-sky-500 to-indigo-600",
  "from-fuchsia-500 to-purple-600",
];

export const Stat = ({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) => (
  <div className={`rounded-2xl bg-gradient-to-br ${tones[label.length % 4]} p-5 text-white shadow-md`}>
    <p className="text-sm text-white/80">{label}</p>
    <p className="mt-1 text-3xl font-bold">{value}</p>
    {sub && <p className="text-xs text-white/70">{sub}</p>}
  </div>
);

export const Bar = ({
  label,
  value,
  max = 100,
  color = "bg-brand-500",
}: {
  label: string;
  value: number;
  max?: number;
  color?: string;
}) => (
  <div>
    <div className="mb-1 flex justify-between text-sm">
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
    <div className="h-2.5 rounded-full bg-slate-100">
      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
  </div>
);

export const ScoreRing = ({ score }: { score: number }) => {
  const color = score >= 80 ? "#22c55e" : score >= 65 ? "#84cc16" : score >= 50 ? "#f59e0b" : "#ef4444";
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#e2e8f0" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (score / 100) * c}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold" style={{ color }}>{score}</span>
        <span className="text-xs text-slate-500">out of 100</span>
      </div>
    </div>
  );
};