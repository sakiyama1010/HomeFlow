// src/pages/ListPage.tsx
import React from "react";
import { sweepData } from "../data/sweepData";
import { Link } from "react-router-dom";
import "../styles/list.css";

const ListPage: React.FC = () => {
  return (
    <div className="list-page">
      <h1>掃除対象リスト</h1>
      <ul className="cleaning-list">
        {sweepData.map((item) => (
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
