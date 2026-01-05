import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SweepRepository } from "../repositories/sweepRepository";
import { diffDaysFromToday, calcNextCleanDate } from "../utils/date";
import { Timestamp } from "firebase/firestore";
import "../styles/top.css";

type TodoSweep = {
  id: string;
  name: string;
  description: string;
  nextCleanDate: string;
  remainDays: number;
};

const TopPage: React.FC = () => {
  const DISPLAY_COUNT = 1;

  const [todos, setTodos] = useState<TodoSweep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      const sweeps = await SweepRepository.getAll();

      const mapped: TodoSweep[] = sweeps.map((sweep) => {
        const next = calcNextCleanDate(sweep.lastCleaned, sweep.cycleDays);

        return {
          id: sweep.id,
          name: sweep.name,
          description: sweep.description,
          nextCleanDate: next,
          remainDays: diffDaysFromToday(next),
        };
      });

      mapped.sort((a, b) => a.remainDays - b.remainDays);

      setTodos(mapped.slice(0, DISPLAY_COUNT));
      setLoading(false);
    };

    fetchTodos();
  }, []);
  return (
    <div className="top-page">
      <h1>Home Flow</h1>
      <p>補充品の在庫管理や最後に掃除した日、掃除方法を管理するアプリ</p>
      <h2>🧹 次の掃除予定</h2>

      {loading && <p>読み込み中...</p>}

      {!loading && todos.length === 0 && <p>掃除予定はありません</p>}

      <ul className="cleaning-list">
        {todos.map((todo) => (
          <li key={todo.id} className="cleaning-item">
            <Link to={`/detail/${todo.id}`} className="item-link">
              <div className="item-header">{todo.name}</div>
              <div className="item-description">{todo.description}</div>
            </Link>
            <div>次回：{todo.nextCleanDate}</div>
            <div>
              {todo.remainDays < 0 && "⚠️ 期限切れ"}
              {todo.remainDays === 0 && "🔥 今日"}
              {todo.remainDays > 0 && `あと ${todo.remainDays} 日`}
            </div>
          </li>
        ))}
      </ul>

      {/* 一覧ページへのリンク */}
      <Link className="cancel-link" to="/list">
        一覧ページへ移動
      </Link>
    </div>
  );
};

export default TopPage;
