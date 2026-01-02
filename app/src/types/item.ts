export type Sweep = {
  id: string; // ← Firestore docId
  name: string;
  description: string;
  cleaningMethod: string;
  lastCleaned: string; // YYYY-MM-DD
};
