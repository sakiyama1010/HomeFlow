export type SweepLocation =
  | "kitchen"
  | "bathroom"
  | "toilet"
  | "living"
  | "bedroom"
  | "entrance"
  | "other";

export type SweepFormValues = {
  name: string;
  cycleDays: number;
  stock?: number;
  location: SweepLocation;
};
