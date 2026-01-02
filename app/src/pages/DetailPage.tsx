import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Sweep } from "../types/item";
import { SweepRepository } from "../repositories/sweepRepository";
import "../styles/detail.css";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [item, setItem] = useState<Sweep | null>(null);
  const [lastCleaned, setLastCleaned] = useState("");

  useEffect(() => {
    if (!id) return;

    SweepRepository.getById(id)
      .then((data) => {
        if (data) {
          setItem(data);
          setLastCleaned(data.lastCleaned);
        } else {
          console.info("not found");
        }
      })
      .catch((e) => {
        console.error("❌ getAll error:", e);
      });
  }, [id]);

  // データがまだ取れていない or 存在しない
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

    // 🔹 将来ここで Firestore update を入れる
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
        掃除済みにする
      </button>

      <Link to="/list" className="back-link">
        一覧に戻る
      </Link>
    </div>
  );
};

export default DetailPage;
