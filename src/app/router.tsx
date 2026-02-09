import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import HomePage from "../pages/Home/HomePage";
import AddToolPage from "../pages/Tools/AddToolPage";
import type {ITool, ToolCreatePayload, ToolUpdatePayload} from "../types/Tool.type";
import { getTools, createTool, updateTool, deleteTool } from "../lib/api";
import EditToolPage from "../pages/Tools/EditToolPage";

export default function AppRouter() {
  const [toolList, setToolList] = useState<ITool[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const tools = await getTools();
        setToolList(tools);
      } catch (e: any) {
        setError(e.message ?? "Failed to load tools");
      }
    })();
  }, []);

  const onAddTool = async (tool: ToolCreatePayload) => {
    const saved = await createTool(tool);
    setToolList((prev) => [...prev, saved]);
  };

  const onUpdateTool = async (tool: ToolUpdatePayload) => {
    const { id, ...payload } = tool;
    const saved = await updateTool(id, payload);
    setToolList((prev) => prev.map((t) => (t.id === id ? saved : t)));
  };

  const onDeleteTool = async (id: number) => {
    await deleteTool(id);
    setToolList((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {error && <div style={{ padding: 12 }}>{error}</div>}
      <Routes>
        <Route
          path="/"
          element={<HomePage toolList={toolList} onDeleteTool={onDeleteTool} />}
        />
        <Route
          path="/tools/new"
          element={<AddToolPage onAddTool={onAddTool} />}
        />
        <Route
          path="/tools/:id/edit"
          element={
            <EditToolPage toolList={toolList} onUpdateTool={onUpdateTool} />
          }
        />
      </Routes>
    </>
  );
}
