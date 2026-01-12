import React from "react";
import type { SweepLocation } from "../types/sweep";
import { LOCATION_LABELS } from "../constants/sweepLocation";

export type SweepFormErrors = {
  id?: string;
  name?: string;
  description?: string;
  cleaningMethod?: string;
  cycleDays?: string;
  stock?: string;
  location?: string;
};

type Props = {
  title: string;

  id?: string;
  showId?: boolean;
  setId?: (v: string) => void;

  name: string;
  description: string;
  cleaningMethod: string;
  cycleDays: number;
  stock: number;
  location: SweepLocation;

  errors: SweepFormErrors;
  onChange: {
    setName: (v: string) => void;
    setDescription: (v: string) => void;
    setCleaningMethod: (v: string) => void;
    setCycleDays: (v: number) => void;
    setStock: (v: number) => void;
    setLocation: (v: SweepLocation) => void;
  };
  onSave: () => void;
  saveLabel: string;
  cancelNode: React.ReactNode;
};

const SweepForm: React.FC<Props> = ({
  title,
  id,
  showId = false,
  setId,
  name,
  description,
  cleaningMethod,
  cycleDays,
  stock,
  location,
  errors,
  onChange,
  onSave,
  saveLabel,
  cancelNode,
}) => {
  return (
    <div className="edit-page">
      <h1>{title}</h1>

      {showId && setId && (
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
      )}

      <div className="form-group">
        <label>名前</label>
        <input
          className={errors.name ? "input-error" : ""}
          value={name}
          onChange={(e) => onChange.setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>場所</label>
        <select
          value={location}
          className={errors.location ? "input-error" : ""}
          onChange={(e) =>
            onChange.setLocation(e.target.value as SweepLocation)
          }
        >
          {Object.entries(LOCATION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.location && <p className="error">{errors.location}</p>}
      </div>

      <div className="form-group">
        <label>説明</label>
        <textarea
          rows={2}
          className={errors.description ? "input-error" : ""}
          value={description}
          onChange={(e) => onChange.setDescription(e.target.value)}
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      <div className="form-group">
        <label>掃除方法</label>
        <textarea
          rows={10}
          className={errors.cleaningMethod ? "input-error" : ""}
          value={cleaningMethod}
          onChange={(e) => onChange.setCleaningMethod(e.target.value)}
        />
        {errors.cleaningMethod && (
          <p className="error">{errors.cleaningMethod}</p>
        )}
      </div>

      <div className="form-group">
        <label>在庫数（個）</label>
        <input
          type="number"
          min={0}
          value={stock}
          className={errors.stock ? "input-error" : ""}
          onChange={(e) => onChange.setStock(Number(e.target.value))}
        />
        {errors.stock && <p className="error">{errors.stock}</p>}
      </div>

      <div className="form-group">
        <label>掃除周期（日）</label>
        <input
          type="number"
          min={1}
          value={cycleDays}
          className={errors.cycleDays ? "input-error" : ""}
          onChange={(e) => onChange.setCycleDays(Number(e.target.value))}
        />
        {errors.cycleDays && <p className="error">{errors.cycleDays}</p>}
      </div>

      <div className="button-row">
        <button className="save-button" onClick={onSave}>
          {saveLabel}
        </button>
        {cancelNode}
      </div>
    </div>
  );
};

export default SweepForm;
