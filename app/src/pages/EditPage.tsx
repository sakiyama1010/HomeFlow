import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SweepRepository } from "../repositories/sweepRepository";
import "../styles/edit.css";

type Errors = {
  name?: string;
  description?: string;
  cleaningMethod?: string;
  cycleDays?: string;
};

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cleaningMethod, setCleaningMethod] = useState("");
  const [cycleDays, setCycleDays] = useState<number>(10);

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const item = await SweepRepository.getById(id);
      if (!item) {
        setLoading(false);
        return;
      }

      setName(item.name);
      setDescription(item.description);
      setCleaningMethod(item.cleaningMethod);
      setCycleDays(item.cycleDays);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const validate = (): Errors => {
    const newErrors: Errors = {};

    if (!name.trim()) {
      newErrors.name = "名前は必須です";
    }

    if (!description.trim()) {
      newErrors.description = "説明は必須です";
    }

    if (!cleaningMethod.trim()) {
      newErrors.cleaningMethod = "掃除方法は必須です";
    }

    if (!cycleDays || cycleDays <= 0) {
      newErrors.cycleDays = "1以上の日数を入力してください";
    }

    return newErrors;
  };

  const handleSave = async () => {
    if (!id) return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await SweepRepository.update(id, {
      name,
      description,
      cleaningMethod,
      cycleDays,
    });

    setToastMessage("更新しました");
    setTimeout(() => {
      navigate(`/detail/${id}`);
    }, 2000);
  };

  if (loading) {
    return <p>ロード中...</p>;
  }

  return (
    <div className="edit-page">
      <h1>掃除対象を編集</h1>

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
        <label>掃除周期（日）</label>
        <input
          type="number"
          min={1}
          value={cycleDays}
          onChange={(e) => setCycleDays(Number(e.target.value))}
        />
        {errors.cycleDays && <p className="error">{errors.cycleDays}</p>}
      </div>

      <div className="button-row">
        <button className="save-button" onClick={handleSave}>
          保存
        </button>

        <Link className="cancel-link" to={`/detail/${id}`}>
          キャンセル
        </Link>
      </div>
      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  );
};

export default EditPage;
