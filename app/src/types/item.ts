import { Timestamp } from "firebase/firestore";

export type Sweep = {
  id: string; // ← Firestore docId
  name: string;
  description: string;
  cleaningMethod: string;
  cycleDays: number; // （日）
  lastCleaned: Timestamp; // YYYY-MM-DD
  updatedAt: Timestamp;
};
