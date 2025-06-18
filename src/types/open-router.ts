export interface OpenRouterMessage {
    role: "system" | "user" | "assistant";
    content: string;
  }
  
  export interface OpenRouterRequest {
    model: string;
    messages: OpenRouterMessage[];
    stream?: boolean;
    temperature?: number;
    max_tokens?: number;
  }
  
  export interface OpenRouterResponse {
    id: string;
    model: string;
    created: number;
    choices: {
      index: number;
      message: OpenRouterMessage;
      finish_reason: string | null;
    }[];
  }
  
  export interface StreamChunk {
    id: string;
    model: string;
    created: number;
    choices: {
      index: number;
      delta: {
        content?: string;
        role?: string;
      };
      finish_reason: string | null;
    }[];
  }
  