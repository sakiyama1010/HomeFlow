import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("コピーライトが表示される", () => {
    render(<Footer />);

    expect(screen.getByText("© 2026 Home Flow")).toBeInTheDocument();
  });

  test("footer 要素が使われている", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });
});
