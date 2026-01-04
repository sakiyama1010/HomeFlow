import { db } from "../libs/firebase";
import { Sweep } from "../types/item";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";

export type CreateSweepInput = {
  id: string;
  name: string;
  description: string;
  cleaningMethod: string;
  cycleDays: number;
};

export const SweepRepository = {
  async getAll(): Promise<Sweep[]> {
    const snapshot = await getDocs(collection(db, "sweeps"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Sweep, "id">),
    }));
  },

  async getById(id: string): Promise<Sweep | null> {
    const ref = doc(db, "sweeps", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      console.log("repo return null:", id);
      return null;
    }

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

  async createWithId(input: CreateSweepInput): Promise<void> {
    const { id, ...data } = input;

    await setDoc(doc(db, "sweeps", id), {
      ...data,
      lastCleaned: Timestamp.now(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
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

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, "sweeps", id));
  },
};
