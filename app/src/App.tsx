import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { TopPage, ListPage, DetailPage, EditPage, NewPage } from "./pages";
import "./styles/index.css";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<TopPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/detail/:id/edit" element={<EditPage />} />
        <Route path="/new" element={<NewPage />} />
      </Route>
    </Routes>
  );
}

export default App;
