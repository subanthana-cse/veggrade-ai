import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzer } from "../services/aiService";
import { VEGETABLES } from "../data/vegetables";
import { useHistory } from "../context/HistoryContext";
import { Card } from "../components/ui";

export default function Scanner() {
  const [mode, setMode] = useState<"upload" | "camera">("upload");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState("");
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const nav = useNavigate();
  const { add } = useHistory();

  const stop = () => stream.current?.getTracks().forEach((t) => t.stop());

  useEffect(() => {
    if (mode !== "camera") {
      stop();
      return;
    }
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        stream.current = s;
        if (video.current) video.current.srcObject = s;
      })
      .catch(() => setError("Camera unavailable. Please allow access or use upload."));
    return stop;
  }, [mode]);

  const setImage = (b: Blob) => {
    setBlob(b);
    setPreview(URL.createObjectURL(b));
  };

  const capture = () => {
    const v = video.current;
    if (!v) return;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d")!.drawImage(v, 0, 0);
    c.toBlob((b) => b && setImage(b), "image/jpeg");
  };

  const run = async () => {
    if (!blob) return;
    setLoading(true);
    const res = await analyzer.analyze(blob, hint || undefined);
    add(res);
    nav(`/result/${res.id}`, { state: res });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">📷 AI Vegetable Scanner</h1>
      <Card className="space-y-5">
        <div className="flex gap-2">
          {(["upload", "camera"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setError("");
              }}
              className={`flex-1 rounded-xl py-2.5 text-sm font-semibold ${
                mode === m ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow" : "bg-slate-100"
              }`}
            >
              {m === "upload" ? "📁 Upload Image" : "📷 Use Camera"}
            </button>
          ))}
        </div>

        {mode === "upload" ? (
          <label className="flex h-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-green-300 bg-green-50 text-green-700 hover:bg-green-100">
            <span className="text-5xl">🥕🍅🥦</span>
            <span className="font-medium">Click to choose a vegetable image</span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => e.target.files?.[0] && setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <div className="space-y-2">
            <video ref={video} autoPlay playsInline muted className="w-full rounded-xl bg-black" />
            <button onClick={capture} className="w-full rounded-xl bg-slate-800 py-2.5 text-white">
              📸 Capture Photo
            </button>
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
        {preview && <img src={preview} alt="Selected" className="max-h-72 w-full rounded-xl object-contain" />}

        <div>
          <p className="mb-2 text-sm font-semibold">Which vegetable? (optional)</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            <button
              onClick={() => setHint("")}
              className={`rounded-xl border-2 p-2 text-sm ${hint === "" ? "border-green-500 bg-green-50" : "border-slate-200"}`}
            >
              <div className="text-2xl">✨</div>Auto-detect
            </button>
            {VEGETABLES.map((v) => (
              <button
                key={v.name}
                onClick={() => setHint(v.name)}
                className={`rounded-xl border-2 p-2 text-sm transition ${
                  hint === v.name ? `border-transparent bg-gradient-to-br ${v.gradient} text-white shadow` : "border-slate-200 hover:border-green-300"
                }`}
              >
                <div className="text-2xl">{v.emoji}</div>
                {v.name}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!blob || loading}
          onClick={run}
          className="w-full rounded-xl bg-gradient-to-r from-green-500 to-teal-600 py-3.5 text-lg font-bold text-white shadow-lg disabled:opacity-50"
        >
          {loading ? "🔬 Analyzing with AI…" : "Analyze Quality"}
        </button>
      </Card>
    </div>
  );
}