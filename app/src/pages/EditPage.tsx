import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SweepRepository } from "../repositories/sweepRepository";
import SweepForm, { SweepFormErrors } from "../components/SweepForm";
import type { SweepLocation } from "../types/sweep";
import "../styles/edit.css";

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cleaningMethod, setCleaningMethod] = useState("");
  const [cycleDays, setCycleDays] = useState<number>(10);
  const [stock, setStock] = useState<number>(0);
  const [location, setLocation] = useState<SweepLocation>("kitchen");

  const [errors, setErrors] = useState<SweepFormErrors>({});
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
      setStock(item.stock);
      setLocation(item.location ?? "other");
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const validate = (): SweepFormErrors => {
    const newErrors: SweepFormErrors = {};

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

    if (stock && stock <= 0) {
      newErrors.stock = "0以上の数を入力してください";
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
      stock,
      location,
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
    <>
      <SweepForm
        title="掃除対象を編集"
        name={name}
        description={description}
        cleaningMethod={cleaningMethod}
        cycleDays={cycleDays}
        stock={stock}
        location={location}
        errors={errors}
        onChange={{
          setName,
          setDescription,
          setCleaningMethod,
          setCycleDays,
          setStock,
          setLocation,
        }}
        onSave={handleSave}
        saveLabel="更新"
        cancelNode={
          <Link className="cancel-link" to={`/detail/${id}`}>
            キャンセル
          </Link>
        }
      />

      {toastMessage && <div className="toast">{toastMessage}</div>}
    </>
  );
};

export default EditPage;
