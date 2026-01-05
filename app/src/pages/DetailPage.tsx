import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Sweep } from "../types/item";
import { SweepRepository } from "../repositories/sweepRepository";
import { Timestamp } from "firebase/firestore";
import { formatDate, calcNextCleanDate } from "../utils/date";
import "../styles/detail.css";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    if (!id) return;

    const ok = window.confirm("この掃除対象を削除しますか？");
    if (!ok) return;

    await SweepRepository.delete(id);
    navigate("/list");
  };
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

    setLoading(false);
  }, [id]);

  if (!item) {
    return;
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
      {loading ? (
        <p className="loading">ロード中...</p>
      ) : !item ? (
        <p className="no-result">対象が見つかりません</p>
      ) : (
        <>
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
          <p>次の掃除予定日：{nextCleanDate}</p>

          <p className="updated-at">更新日：{formatDate(item.updatedAt)}</p>
          <div className="button-row">
            <Link className="save-button" to={`/detail/${item.id}/edit`}>
              編集する
            </Link>
            <button className="delete-button" onClick={handleDelete}>
              削除する
            </button>
            <Link to="/list" className="cancel-link">
              一覧に戻る
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
