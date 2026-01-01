import React from "react";
import { Link } from "react-router-dom";

const TopPage: React.FC = () => {
  return (
    <div className="top-page">
      <h1>トップページ</h1>
      <p>ここがアプリの最初に表示されるページです。</p>

      {/* 一覧ページへのリンク */}
      <Link to="/list">一覧ページへ移動</Link>
    </div>
  );
};

export default TopPage;
