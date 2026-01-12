import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sweep } from "../types/item";
import { SweepRepository } from "../repositories/sweepRepository";
import { formatDate } from "../utils/date";
import { LOCATION_LABELS } from "../constants/sweepLocation";
import type { SweepLocation } from "../types/sweep";
import "../styles/list.css";

const ListPage: React.FC = () => {
  const [sweeps, setSweeps] = useState<Sweep[]>([]);
  const [loading, setLoading] = useState(true);

  // 検索フォーム
  const [keyword, setKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<SweepLocation | "">(
    "",
  );

  useEffect(() => {
    // NOTE:件数多くない前提なので全件取得からの絞り込みにしているだけ
    SweepRepository.getAll()
      .then((data) => {
        setSweeps(data);

        // データセットしたのでローディング解除する
        setLoading(false);
      })
      .catch((e) => {
        console.error("❌ getAll error:", e);
      });
  }, []);

  // 条件絞込
  const filteredSweeps = sweeps.filter((item) => {
    const keywordMatch =
      item.name.includes(keyword) || item.description.includes(keyword);

    const locationMatch =
      selectedLocation === "" || item.location === selectedLocation;

    return keywordMatch && locationMatch;
  });

  // 条件クリア
  const handleReset = () => {
    setKeyword("");
    setSelectedLocation("");
  };

  return (
    <div className="list-page">
      <h1>掃除対象リスト</h1>

      <h2>検索フォーム</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="名前、説明文の部分一致検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select
          value={selectedLocation}
          onChange={(e) =>
            setSelectedLocation(e.target.value as SweepLocation | "")
          }
        >
          <option value="">すべての場所</option>
          {Object.entries(LOCATION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button type="button" className="reset-button" onClick={handleReset}>
          リセット
        </button>
      </div>

      <h2>検索結果</h2>
      {loading ? (
        <p className="loading">ロード中...</p>
      ) : filteredSweeps.length === 0 ? (
        <p className="no-result">該当する掃除対象はありません</p>
      ) : (
        <ul className="cleaning-list">
          {filteredSweeps.map((item) => (
            <li key={item.id} className="cleaning-item">
              <Link to={`/detail/${item.id}`} className="item-link">
                <div className="item-header">{item.name}</div>
                {item.location && (
                  <span className="badge">
                    {LOCATION_LABELS[item.location]}
                  </span>
                )}
                <div className="item-description">{item.description}</div>
                {item.stock !== undefined && item.stock !== null && (
                  <div className="item-stock">在庫数：{item.stock} 個</div>
                )}
                {item.lastCleaned !== undefined &&
                  item.lastCleaned !== null && (
                    <div className="item-lastCleaned">
                      最終清掃日：{formatDate(item.lastCleaned)}{" "}
                    </div>
                  )}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="button-row">
        <Link to="/new" className="add-link">
          新規登録
        </Link>
        <Link className="cancel-link" to="/">
          TOPページに戻る
        </Link>
      </div>
    </div>
  );
};

export default ListPage;
