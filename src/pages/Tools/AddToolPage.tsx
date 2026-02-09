import { useNavigate } from "react-router";
import type { ToolCreatePayload } from "../../types/Tool.type";
import ToolForm from "../../components/ToolForm/ToolForm";

type AddToolPageProps = {
  onAddTool: (tool: ToolCreatePayload) => Promise<void>;
};

export default function AddToolPage({ onAddTool }: AddToolPageProps) {
  const navigate = useNavigate();

  return (
    <ToolForm
      onBackBtnClickHnd={() => navigate("/")}
      onSubmitBtnClickHnd={async (tool) => {
        await onAddTool(tool);
        navigate("/", { state: { flash: "Tool added successfully." } });
      }}
      submitLabel="Add Tool"
    />
  );
}
