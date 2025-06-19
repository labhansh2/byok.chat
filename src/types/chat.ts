export interface Thread {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  model: string;
}

export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
}

export interface Message {
  id: string;
  threadId: string;
  role: MessageRole;
  // model: string; // Add this while implementing the database
  createdAt: Date;
  updatedAt: Date;
}

export enum BlockType {
  TEXT = "text",
  CODE = "code",
  // don't add this fields yet, not even in the database
  // IMAGE = "image",
  // AUDIO = "audio",
  // VIDEO = "video",
  // FILE = "file",
}

export interface Block {
  id: string;
  messageId: string;
  content: string | null;
  type: BlockType;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
