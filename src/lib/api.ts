import type { ITool, ToolCreatePayload } from "../types/Tool.type";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed (${res.status})`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export function getTools(): Promise<ITool[]> {
  return request<ITool[]>("/tools");
}

export function getTool(id: number): Promise<ITool> {
  return request<ITool>(`/tools/${id}`);
}

export function createTool(tool: ToolCreatePayload): Promise<ITool> {
  return request<ITool>("/tools", {
    method: "POST",
    body: JSON.stringify(tool),
  });
}

export function updateTool(
  id: number,
  tool: ToolCreatePayload,
): Promise<ITool> {
  return request<ITool>(`/tools/${id}`, {
    method: "PUT",
    body: JSON.stringify(tool),
  });
}

export function deleteTool(id: number): Promise<void> {
  return request<void>(`/tools/${id}`, {
    method: "DELETE",
  });
}
