import { useNavigate, useParams } from "react-router";
import type { ITool, ToolCreatePayload, ToolUpdatePayload } from "../../types/Tool.type";
import ToolForm from "../../components/ToolForm/ToolForm";

type EditToolPageProps = {
  toolList: ITool[];
  onUpdateTool: (tool: ToolUpdatePayload) => Promise<void>;
};

export default function EditToolPage({ toolList, onUpdateTool }: EditToolPageProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const toolId = Number(id);
  const toolToEdit = toolList.find((t) => t.id === toolId);

  if (!toolToEdit) {
    return (
      <div style={{ padding: 16 }}>
        <h3>Tool not found</h3>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  return (
    <ToolForm
      initialTool={toolToEdit}
      onBackBtnClickHnd={() => navigate("/")}
      onSubmitBtnClickHnd={async (data: ToolCreatePayload) => {
        await onUpdateTool({ id: toolToEdit.id, ...data});
        navigate("/", { state: { flash: "Tool updated successfully." } });
      }}
      submitLabel="Save Changes"
    />
  );
}
