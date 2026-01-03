import React from "react";
import { Link } from "react-router-dom";
import "../styles/top.css";

const TopPage: React.FC = () => {
  return (
    <div className="top-page">
      <h1>Home Flow</h1>
      <p>補充品の在庫管理や最後に掃除した日、掃除方法を管理するアプリ</p>
      TODO:次の掃除予定日までの期限が違いN件を表示させたい
      {/* 一覧ページへのリンク */}
      <Link to="/list">一覧ページへ移動</Link>
    </div>
  );
};

export default TopPage;
