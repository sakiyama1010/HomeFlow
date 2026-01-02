import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Sweep } from "../types/item";
import { SweepRepository } from "../repositories/sweepRepository";
import { Timestamp } from "firebase/firestore";
import "../styles/detail.css";

function formatDate(ts: Timestamp): string {
  const date = ts.toDate();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd}`;
}

const calcNextCleanDate = (
  lastCleaned: Timestamp,
  cycleDays: number,
): string => {
  const baseDate = lastCleaned.toDate();
  baseDate.setDate(baseDate.getDate() + cycleDays);

  const yyyy = baseDate.getFullYear();
  const mm = String(baseDate.getMonth() + 1).padStart(2, "0");
  const dd = String(baseDate.getDate()).padStart(2, "0");

  return `${yyyy}/${mm}/${dd}`;
};

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [item, setItem] = useState<Sweep | null>(null);
  const [lastCleaned, setLastCleaned] = useState<Timestamp | null>(null);

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
        console.error("getAll error:", e);
      });
  }, [id]);

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

  const nextCleanDate = calcNextCleanDate(item.lastCleaned, item.cycleDays);

  const handleMarkCleaned = () => {
    const now = Timestamp.now();
    setLastCleaned(now);

    try {
      SweepRepository.markCleaned(item.id);
    } catch (e) {
      console.error("update failed:", e);
    }
  };

  return (
    <div className="detail-page">
      <h1>{item.name}</h1>
      <p className="description">{item.description}</p>

      <h2>掃除方法</h2>
      <p className="method">{item.cleaningMethod}</p>

      <h2>最後に掃除した日</h2>
      <p className="last-cleaned">
        {lastCleaned && formatDate(lastCleaned)}
        <br />
        <button className="cleaned-button" onClick={handleMarkCleaned}>
          掃除日を更新する
        </button>
      </p>
      <p>掃除周期：{item.cycleDays} 日</p>
      <p>次の掃除予定日{nextCleanDate}</p>

      <p className="updated-at">更新日：{formatDate(item.updatedAt)}</p>
      <div className="button-row">
        <Link className="save-button" to={`/detail/${item.id}/edit`}>
          編集する
        </Link>

        <Link to="/list" className="cancel-link">
          一覧に戻る
        </Link>
      </div>
    </div>
  );
};

export default DetailPage;
