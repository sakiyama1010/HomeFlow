import { Timestamp } from "firebase/firestore";

/**
 * Firestore Timestamp を YYYY/MM/DD に変換
 */
export const formatDate = (ts: Timestamp): string => {
  const date = ts.toDate();

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}/${mm}/${dd}`;
};

export const calcNextCleanDate = (
  lastCleaned: Timestamp,
  cycleDays: number,
): string => {
  const baseDate = lastCleaned.toDate();
  baseDate.setDate(baseDate.getDate() + cycleDays);

  const yyyy = baseDate.getFullYear();
  const mm = String(baseDate.getMonth() + 1).padStart(2, "0");
  const dd = String(baseDate.getDate()).padStart(2, "0");

  return `${yyyy}/${mm}/${dd}`;
};

export const diffDaysFromToday = (date: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diffMs = target.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};
