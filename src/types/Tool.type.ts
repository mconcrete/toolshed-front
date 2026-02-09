export interface ITool {
  id: number;
  name: string | undefined ; 
  status: string | undefined ; 
  notes: string | undefined ; 
  serial_number: string | undefined ; 
  created_at: string; 
  updated_at: string;
}

export type ToolCreatePayload = Omit<ITool, "id" | "created_at" | "updated_at">;
export type ToolUpdatePayload = Pick<ITool, "id"> & ToolCreatePayload