import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SweepRepository } from "../repositories/sweepRepository";
import SweepForm, { SweepFormErrors } from "../components/SweepForm";
import type { SweepLocation } from "../types/sweep";
import "../styles/edit.css";

const NewPage: React.FC = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cleaningMethod, setCleaningMethod] = useState("");
  const [cycleDays, setCycleDays] = useState(10);
  const [stock, setStock] = useState(0);
  const [location, setLocation] = useState<SweepLocation>("kitchen");

  const [errors, setErrors] = useState<SweepFormErrors>({});

  const [toastMessage, setToastMessage] = useState("");

  const validate = (): SweepFormErrors => {
    const newErrors: SweepFormErrors = {};
    if (!id.trim()) newErrors.id = "IDは必須です";

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
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await SweepRepository.createWithId({
      id,
      name,
      description,
      cleaningMethod,
      cycleDays,
      stock,
      location,
    });

    setToastMessage("登録しました");
    setTimeout(() => {
      navigate(`/detail/${id}`);
    }, 2000);
  };

  return (
    <>
      <SweepForm
        title="掃除対象を新規登録"
        showId
        id={id}
        setId={setId}
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
        saveLabel="登録"
        cancelNode={
          <Link className="cancel-link" to="/list">
            キャンセル
          </Link>
        }
      />

      {toastMessage && <div className="toast">{toastMessage}</div>}
    </>
  );
};

export default NewPage;
