import { db } from "../libs/firebase";
import { Sweep } from "../types/item";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";

export const SweepRepository = {
  async getAll(): Promise<Sweep[]> {
    const snapshot = await getDocs(collection(db, "sweeps"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Sweep, "id">),
    }));
  },

  async getById(id: string): Promise<Sweep | null> {
    console.log("repo getById:", id);
    const ref = doc(db, "sweeps", id);
    const snap = await getDoc(ref);
    console.log("repo snap:", id);

    if (!snap.exists()) {
      console.log("repo return null:", id);
      return null;
    }
    console.log("repo return not null:", id);

    return {
      id: snap.id,
      ...(snap.data() as Omit<Sweep, "id">),
    };
  },

  async markCleaned(id: string): Promise<void> {
    const ref = doc(db, "sweeps", id);

    await updateDoc(ref, {
      lastCleaned: Timestamp.now(),
      updatedAt: serverTimestamp(),
    });
  },

  async update(
    id: string,
    data: Pick<Sweep, "name" | "description" | "cleaningMethod" | "cycleDays">,
  ): Promise<void> {
    const ref = doc(db, "sweeps", id);

    await updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },
};
