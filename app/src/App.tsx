import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopPage from "./pages/TopPage";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import "./styles/index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />{" "}
        {/* :id はパラメータ */}
      </Routes>
    </Router>
  );
}

export default App;
