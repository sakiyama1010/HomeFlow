import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { sweepData } from "../data/sweepData";
import "../styles/detail.css";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const item = sweepData.find((data) => data.id === Number(id));

  // Hooks は必ずトップレベルで呼ぶ
  // item が存在しない場合は空文字で初期化
  const [lastCleaned, setLastCleaned] = useState(item ? item.lastCleaned : "");

  // item が存在しない場合は早期 return
  if (!item) {
    return (
      <div className="detail-page">
        <h1>対象が見つかりません</h1>
        <Link to="/" className="back-link">
          TOPに戻る
        </Link>
      </div>
    );
  }

  const handleMarkCleaned = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;
    setLastCleaned(todayStr);
  };

  return (
    <div className="detail-page">
      <h1>{item.name}</h1>
      <p className="description">{item.description}</p>

      <h2>掃除方法</h2>
      <p className="method">{item.cleaningMethod}</p>

      <h2>最後に掃除した日</h2>
      <p className="last-cleaned">{lastCleaned}</p>

      <button className="cleaned-button" onClick={handleMarkCleaned}>
        ✅ 掃除済みにする
      </button>

      <Link to="/list" className="back-link">
        一覧に戻る
      </Link>
    </div>
  );
};

export default DetailPage;
