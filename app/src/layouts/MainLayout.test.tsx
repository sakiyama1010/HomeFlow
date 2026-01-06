import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";

describe("MainLayout", () => {
  const renderLayout = () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<div>Outlet Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  };

  test("main 要素が存在する", () => {
    renderLayout();

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
