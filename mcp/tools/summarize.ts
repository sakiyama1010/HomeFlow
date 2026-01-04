import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

export async function summarizeSweeps() {
  const snap = await getDocs(collection(db, "sweeps"));

  const items = snap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      lastCleaned: data.lastCleaned?.toDate?.()?.toISOString() ?? null,
      cycleDays: data.cycleDays,
    };
  });

  return {
    count: items.length,
    summary: `現在 ${items.length} 件の掃除対象があります`,
    items,
  };
}
