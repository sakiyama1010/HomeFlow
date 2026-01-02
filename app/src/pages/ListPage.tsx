// src/pages/ListPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sweep } from "../types/item";
import { SweepRepository } from "../repositories/sweepRepository";
import "../styles/list.css";

const ListPage: React.FC = () => {
  const [sweeps, setSweeps] = useState<Sweep[]>([]);

  useEffect(() => {
    SweepRepository.getAll()
      .then((data) => {
        setSweeps(data);
      })
      .catch((e) => {
        console.error("❌ getAll error:", e);
      });
  }, []);

  return (
    <div className="list-page">
      <h1>掃除対象リスト</h1>

      <ul className="cleaning-list">
        {sweeps.map((item) => (
          <li key={item.id} className="cleaning-item">
            <Link to={`/detail/${item.id}`} className="item-link">
              <div className="item-header">{item.name}</div>
              <div className="item-description">{item.description}</div>
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/">TOPページに戻る</Link>
    </div>
  );
};

export default ListPage;
