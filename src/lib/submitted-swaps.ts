import { isValidSwapSelection } from "./swap-rules";

export type SubmittedSwap = {
  id: string;
  targetId: string;
  offeredIds: string[];
  createdAt: string;
  status: "Menunggu persetujuan";
};

const STORAGE_KEY = "barteran:demo-submitted-swaps:v1";

export function readSubmittedSwaps(): SubmittedSwap[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const rows: unknown = JSON.parse(raw);
    if (!Array.isArray(rows)) return [];
    return rows.filter((row): row is SubmittedSwap =>
      typeof row?.id === "string" && typeof row?.targetId === "string" &&
      typeof row?.createdAt === "string" && row?.status === "Menunggu persetujuan" &&
      Array.isArray(row.offeredIds) && row.offeredIds.every((id: unknown) => typeof id === "string") &&
      isValidSwapSelection(row.offeredIds, false));
  } catch { return []; }
}

export function submitDemoSwap(targetId: string, offeredIds: string[]): SubmittedSwap {
  if (!isValidSwapSelection(offeredIds, false)) throw new Error("Pilih pakaian yang berbeda untuk ditawarkan.");
  const swap: SubmittedSwap = {
    id: crypto.randomUUID(), targetId, offeredIds,
    createdAt: new Date().toISOString(), status: "Menunggu persetujuan",
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([swap, ...readSubmittedSwaps()]));
  return swap;
}