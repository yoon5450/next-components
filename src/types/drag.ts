export interface Position {
  x: number;
  y: number;
}

export interface DragState {
  position: Position | null;
  text: string;
  isLoading: boolean;
  error: string | null;
}

export interface AskRequest {
  snippet: string;
}

export interface AskResponse {
  success: boolean;
  answer?: string;
  error?: string;
}

