import { Timestamp } from "firebase/firestore";
import { formatDate, calcNextCleanDate } from "./date";

describe("date utils", () => {
  describe("formatDate", () => {
    test("Timestamp を YYYY/MM/DD 形式に変換できる", () => {
      const ts = Timestamp.fromDate(new Date(2026, 0, 3)); // 2026/01/03
      expect(formatDate(ts)).toBe("2026/01/03");
    });
  });

  describe("calcNextCleanDate", () => {
    test("掃除周期を足した次の掃除日を計算できる", () => {
      const lastCleaned = Timestamp.fromDate(new Date(2026, 0, 3));
      const result = calcNextCleanDate(lastCleaned, 10);

      // 🔽 Timestamp → Date に変換して検証
      const date = result.toDate();

      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(0); // 0 = January
      expect(date.getDate()).toBe(13);
    });

    test("周期が0日の場合は同じ日になる", () => {
      const lastCleaned = Timestamp.fromDate(new Date(2026, 0, 3));
      const result = calcNextCleanDate(lastCleaned, 0);

      const date = result.toDate();

      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(3);
    });
  });
});
