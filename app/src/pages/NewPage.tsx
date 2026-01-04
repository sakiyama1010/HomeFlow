import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SweepRepository } from "../repositories/sweepRepository";

const NewPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cleaningMethod, setCleaningMethod] = useState("");
  const [cycleDays, setCycleDays] = useState(7);
  const [id, setId] = useState("");

  const handleSave = async () => {
    await SweepRepository.createWithId({
      id,
      name,
      description,
      cleaningMethod,
      cycleDays,
    });

    navigate(`/detail/${id}`);
  };

  return (
    <div className="edit-page">
      <h1>掃除対象を新規登録</h1>

      <div className="form-group">
        <label>ID</label>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="kitchen / bathroom など"
        />
      </div>

      <div className="form-group">
        <label>名前</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>掃除方法</label>
        <textarea
          value={cleaningMethod}
          onChange={(e) => setCleaningMethod(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>掃除周期（日）</label>
        <input
          type="number"
          value={cycleDays}
          min={1}
          onChange={(e) => setCycleDays(Number(e.target.value))}
        />
      </div>

      <div className="button-row">
        <button className="save-button" onClick={handleSave}>
          登録
        </button>

        <Link className="cancel-link" to="/list">
          キャンセル
        </Link>
      </div>
    </div>
  );
};

export default NewPage;
