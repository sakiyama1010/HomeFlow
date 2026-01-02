import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "4px" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
