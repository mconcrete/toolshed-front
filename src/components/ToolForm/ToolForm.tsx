import "./ToolForm.css";
import { useEffect, useState } from "react";
import type { ITool } from "../../types/Tool.type";

type ToolCreatePayload = Omit<ITool, "id" | "created_at" | "updated_at">;
type ToolUpdatePayload = Pick<ITool, "id"> & ToolCreatePayload


type ToolFormBaseProps = {
  onBackBtnClickHnd: () => void;
  submitLabel?: string;
};

type ToolFormAddProps = ToolFormBaseProps & {
  initialTool?: undefined;
  onSubmitBtnClickHnd: (data: ToolCreatePayload) => Promise<void>;
};

type ToolFormEditProps = ToolFormBaseProps & {
  initialTool: ITool;
  onSubmitBtnClickHnd: (data: ToolUpdatePayload) => Promise<void>;
};

type ToolFormProps = ToolFormAddProps | ToolFormEditProps;

export default function ToolForm(props: ToolFormProps) {
  const { initialTool, onBackBtnClickHnd, submitLabel } =
    props;

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [serial_number, setSerial] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialTool) return;
    setName(initialTool.name ?? "");
    setStatus(initialTool.status ?? "");
    setSerial(initialTool.serial_number ?? "");
    setNotes(initialTool.notes ?? "");
  }, [initialTool]);

  const handleSubmitClick = async () => {
    const errors: string[] = [];

    if (!name.trim()) errors.push("Name is required");
    if (!status.trim()) errors.push("Status is required");
    if (!serial_number.trim()) errors.push("Serial number is required");

    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }
    setError(null);

    const baseData = {
      name,
      status,
      serial_number,
      notes,
    };
    try {
      if (props.initialTool) {
        await props.onSubmitBtnClickHnd({ ...baseData, id: props.initialTool.id });
      } else {
        await props.onSubmitBtnClickHnd(baseData);
      }
    } catch (err: any) {
      if (err?.errors) {
        setError(Object.values(err.errors).flat().join(", "));
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="form-container">
      <div>
        <h3>{initialTool ? "Edit Tool Form" : "Add Tool Form"}</h3>
        {error && <p className="error-text">{error}</p>}
      </div>

      <form>
        <div className="form-row">
          <label>Name : </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Status : </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">-- Select status --</option>
            <option value="in_service">In Service</option>
            <option value="out_of_service">Out of Service</option>
          </select>
        </div>

        <div className="form-row">
          <label>Serial : </label>
          <input
            type="text"
            value={serial_number}
            onChange={(e) => setSerial(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Notes : </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div>
          <input type="button" value="Back" onClick={onBackBtnClickHnd} />
          <input
            type="button"
            value={submitLabel ?? (initialTool ? "Save Changes" : "Add Tool")}
            onClick={handleSubmitClick}
          />
        </div>
      </form>
    </div>
  );
}
