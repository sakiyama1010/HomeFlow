import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  const renderHeader = () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
  };

  test("ロゴが表示される", () => {
    renderHeader();

    expect(screen.getByText("Home Flow")).toBeInTheDocument();
  });

  test("一覧リンクが表示される", () => {
    renderHeader();

    const link = screen.getByRole("link", { name: "一覧" });
    expect(link).toBeInTheDocument();
  });

  test("一覧リンクの遷移先が /list である", () => {
    renderHeader();

    const link = screen.getByRole("link", { name: "一覧" });
    expect(link).toHaveAttribute("href", "/list");
  });
});
