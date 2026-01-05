import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sweep } from "../types/item";
import { SweepRepository } from "../repositories/sweepRepository";
import "../styles/list.css";

const ListPage: React.FC = () => {
  const [sweeps, setSweeps] = useState<Sweep[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

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
  const filteredSweeps = sweeps.filter(
    (sweep) =>
      sweep.name.includes(keyword) || sweep.description.includes(keyword),
  );

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
                <div className="item-description">{item.description}</div>
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
