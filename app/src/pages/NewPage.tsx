import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SweepRepository } from "../repositories/sweepRepository";

type Errors = {
  id?: string;
  name?: string;
  description?: string;
  cleaningMethod?: string;
  cycleDays?: string;
  stock?: string;
};

const NewPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cleaningMethod, setCleaningMethod] = useState("");
  const [cycleDays, setCycleDays] = useState<number>(10);
  const [stock, setStock] = useState<number>(0);
  const [id, setId] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSave = async () => {
    if (!validate()) return;
    await SweepRepository.createWithId({
      id,
      name,
      description,
      cleaningMethod,
      cycleDays,
      stock,
    });

    navigate(`/detail/${id}`);
  };

  const validate = () => {
    const newErrors: Errors = {};

    if (!id.trim()) {
      newErrors.id = "IDは必須です";
    }

    if (!name.trim()) {
      newErrors.name = "名前は必須です";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="edit-page">
      <h1>掃除対象を新規登録</h1>

      <div className="form-group">
        <label>ID</label>
        <input
          className={errors.id ? "input-error" : ""}
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="kitchen / bathroom など"
        />
        {errors.id && <p className="error">{errors.id}</p>}
      </div>

      <div className="form-group">
        <label>名前</label>
        <input
          className={errors.name ? "input-error" : ""}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="キッチン など"
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>説明</label>
        <textarea
          className={errors.description ? "input-error" : ""}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      <div className="form-group">
        <label>掃除方法</label>
        <textarea
          className={errors.cleaningMethod ? "input-error" : ""}
          value={cleaningMethod}
          onChange={(e) => setCleaningMethod(e.target.value)}
        />
        {errors.cleaningMethod && (
          <p className="error">{errors.cleaningMethod}</p>
        )}
      </div>

      <div className="form-group">
        <label>在庫数（個）</label>
        <input
          className={errors.stock ? "input-error" : ""}
          type="number"
          min={0}
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
        {errors.stock && <p className="error">{errors.stock}</p>}
      </div>

      <div className="form-group">
        <label>掃除周期（日）</label>
        <input
          className={errors.cycleDays ? "input-error" : ""}
          type="number"
          min={1}
          value={cycleDays}
          onChange={(e) => setCycleDays(Number(e.target.value))}
        />
        {errors.cycleDays && <p className="error">{errors.cycleDays}</p>}
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
