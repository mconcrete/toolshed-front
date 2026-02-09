import type { ITool } from "../../types/Tool.type";
import "./ToolViewModal.css";

type Props = {
  tool: ITool;
  onClose: () => void;
};

const formatDate = (value?: string) => {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleString();
};

const ToolViewModal = ({ tool, onClose }: Props) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{tool.name}</h2>
        <p><strong>ID:</strong> {tool.id}</p>
        <p><strong>Status:</strong> {tool.status}</p>
        <p><strong>Serial Number:</strong> {tool.serial_number}</p>
        <p><strong>Notes:</strong> {tool.notes || ""}</p>
        <p><strong>Created At:</strong> {formatDate(tool.created_at)}</p>
        <p><strong>Updated At:</strong> {formatDate(tool.updated_at)}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ToolViewModal;