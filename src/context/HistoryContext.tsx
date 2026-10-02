import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AnalysisResult } from "../types";
import { VEGETABLES } from "../data/vegetables";
import { mockResult } from "../services/aiService";

interface Ctx {
  history: AnalysisResult[];
  add: (r: AnalysisResult) => void;
  clear: () => void;
}

const HistoryContext = createContext<Ctx>(null!);
export const useHistory = () => useContext(HistoryContext);

const KEY = "veggrade-history";
const seed = () => VEGETABLES.slice(0, 8).map((v, i) => mockResult(v.name, i));

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<AnalysisResult[]>(() => {
    try {
      const s = localStorage.getItem(KEY);
      return s ? JSON.parse(s) : seed();
    } catch {
      return seed();
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(history.map(({ image, ...r }) => r)));
  }, [history]);

  const add = (r: AnalysisResult) => setHistory((h) => [r, ...h]);
  const clear = () => setHistory([]);

  return <HistoryContext.Provider value={{ history, add, clear }}>{children}</HistoryContext.Provider>;
}