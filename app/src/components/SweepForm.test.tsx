import { render, screen } from "@testing-library/react";
import SweepForm, { SweepFormErrors } from "./SweepForm";

const setup = (overrideProps = {}) => {
  const props = {
    title: "テスト用タイトル",
    showId: true,
    id: "kitchen",
    setId: jest.fn(),

    name: "名前",
    description: "説明",
    cleaningMethod: "掃除方法",
    cycleDays: 7,
    stock: 3,

    errors: {} as SweepFormErrors,

    onChange: {
      setName: jest.fn(),
      setDescription: jest.fn(),
      setCleaningMethod: jest.fn(),
      setCycleDays: jest.fn(),
      setStock: jest.fn(),
    },

    onSave: jest.fn(),
    saveLabel: "保存",
    cancelNode: <div>キャンセル</div>,

    ...overrideProps,
  };

  render(<SweepForm {...props} />);
  return props;
};

describe("SweepForm", () => {
  test("タイトルと入力項目が表示される", () => {
    setup();

    expect(screen.getByText("テスト用タイトル")).toBeInTheDocument();
    expect(screen.getByLabelText("名前")).toBeInTheDocument();
    expect(screen.getByLabelText("説明")).toBeInTheDocument();
    expect(screen.getByLabelText("掃除方法")).toBeInTheDocument();
    expect(screen.getByLabelText("在庫数（個）")).toBeInTheDocument();
    expect(screen.getByLabelText("掃除周期（日）")).toBeInTheDocument();
  });
});
