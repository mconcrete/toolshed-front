import type { ITool } from "../../types/Tool.type";
import "./ToolList.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import ToolViewModal from "../ToolView/ToolViewModal";

type Props = {
  list: ITool[];
  onDeleteTool: (id: number) => Promise<void>;
};


const ToolList = ({ list, onDeleteTool }: Props) => {
  const [selectedTool, setSelectedTool] = useState<ITool | null>(null);
  const navigate = useNavigate();

  return (
    <div>
      <article>
        <h3 className="list-header"> Tool List</h3>
      </article>
      <table>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Serial Number</th>
          <th>Actions</th>
        </tr>
        {list.map((tool) => {
          console.log(tool);
          return (
            <tr key={tool.id}>
              <td>{tool.name}</td>
              <td>{tool.status}</td>
              <td>{tool.serial_number}</td>
              <td>
                <div>
                  <input
                    type="button"
                    value="View"
                    onClick={() => setSelectedTool(tool)}
                  />

                  <Link to={`/tools/${tool.id}/edit`}>
                    <input type="button" value="Edit" />
                  </Link>

                  <input
                    type="button"
                    value="Delete"
                    onClick={async () => {
                      if (!confirm(`Delete "${tool.name}"?`)) return;
                      try {
                        await onDeleteTool(tool.id);
                        navigate("/", {
                          state: { flash: "Tool deleted successfully." },
                        }); 
                      } catch (e: any) {
                        alert(e?.message ?? "Failed to delete tool");
                      }
                    }}
                  />
                </div>
              </td>
            </tr>
          );
        })}
        {selectedTool && (
          <ToolViewModal
            tool={selectedTool}
            onClose={() => setSelectedTool(null)}
          />
        )}
      </table>
    </div>
  );
};

export default ToolList;
