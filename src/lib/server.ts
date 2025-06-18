import { v4 as uuidv4 } from "uuid";

import { Thread, Message, Block, BlockType, MessageRole } from "@/types/chat";

export const threads: Thread[] = [
  {
    id: "thread-1",
    title: "Project Discussion",
    createdAt: new Date("2024-03-01T10:00:00Z"),
    updatedAt: new Date("2024-03-01T11:30:00Z"),
    model: "GPT-4",
  },
  {
    id: "thread-2",
    title: "Code Review",
    createdAt: new Date("2024-03-02T14:00:00Z"),
    updatedAt: new Date("2024-03-02T15:45:00Z"),
    model: "GPT-4",
  },
  {
    id: "thread-3",
    title: "Bug Investigation",
    createdAt: new Date("2024-03-03T09:00:00Z"),
    updatedAt: new Date("2024-03-03T10:15:00Z"),
    model: "claude-3-5-sonnet",
  },
];

export const messages: Message[] = [
  {
    id: "msg-1",
    threadId: "thread-1",
    role: MessageRole.USER,
    createdAt: new Date("2024-03-01T10:00:00Z"),
    updatedAt: new Date("2024-03-01T10:00:00Z"),
  },
  {
    id: "msg-2",
    threadId: "thread-1",
    role: MessageRole.ASSISTANT,
    createdAt: new Date("2024-03-01T10:05:00Z"),
    updatedAt: new Date("2024-03-01T10:05:00Z"),
  },
  {
    id: "msg-3",
    threadId: "thread-2",
    role: MessageRole.USER,
    createdAt: new Date("2024-03-02T14:00:00Z"),
    updatedAt: new Date("2024-03-02T14:00:00Z"),
  },
  {
    id: "msg-4",
    threadId: "thread-2",
    role: MessageRole.ASSISTANT,
    createdAt: new Date("2024-03-02T14:10:00Z"),
    updatedAt: new Date("2024-03-02T14:10:00Z"),
  },
  {
    id: "msg-5",
    threadId: "thread-3",
    role: MessageRole.USER,
    createdAt: new Date("2024-03-03T09:00:00Z"),
    updatedAt: new Date("2024-03-03T09:00:00Z"),
  },
];

export const blocks: Block[] = [
  {
    id: "block-1",
    messageId: "msg-1",
    content:
      "Can you help me review the latest changes to the authentication system?",
    type: BlockType.TEXT,
    metadata: {},
    createdAt: new Date("2024-03-01T10:00:00Z"),
    updatedAt: new Date("2024-03-01T10:00:00Z"),
  },
  {
    id: "block-2",
    messageId: "msg-2",
    content:
      "I'll help you review the authentication changes. What specific aspects would you like me to focus on?",
    type: BlockType.TEXT,
    metadata: {},
    createdAt: new Date("2024-03-01T10:05:00Z"),
    updatedAt: new Date("2024-03-01T10:05:00Z"),
  },
  {
    id: "block-3",
    messageId: "msg-3",
    content:
      "I'm getting a 500 error when trying to deploy the application. Here's the error log:",
    type: BlockType.TEXT,
    metadata: {},
    createdAt: new Date("2024-03-02T14:00:00Z"),
    updatedAt: new Date("2024-03-02T14:00:00Z"),
  },
  {
    id: "block-4",
    messageId: "msg-4",
    content:
      "Let me help you debug that. Could you share the complete error stack trace?",
    type: BlockType.TEXT,
    metadata: {},
    createdAt: new Date("2024-03-02T14:10:00Z"),
    updatedAt: new Date("2024-03-02T14:10:00Z"),
  },
  {
    id: "block-5",
    messageId: "msg-5",
    content:
      "The database queries are running slow. Can you help optimize them?",
    type: BlockType.TEXT,
    metadata: {},
    createdAt: new Date("2024-03-03T09:00:00Z"),
    updatedAt: new Date("2024-03-03T09:00:00Z"),
  },
];

export function getThreads(): Promise<Thread[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(threads);
    }, 200);
  });
}

export function getThreadById(id: string): Promise<Thread | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(threads.find((thread) => thread.id === id));
    }, 200);
  });
}

export function createThread(title: string) {
  const newThread: Thread = {
    id: uuidv4(),
    title,
    createdAt: new Date(),
    updatedAt: new Date(),
    model: "GPT-4",
  };
  threads.push(newThread);
  return newThread;
}

export function getMessages(threadId: string) {
  return messages.filter((message) => message.threadId === threadId);
}

export function createMessage(threadId: string) {
  const newMessage: Message = {
    id: uuidv4(),
    threadId,
    role: MessageRole.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  messages.push(newMessage);
  return newMessage;
}

export function getBlocks(messageId: string) {
  return blocks.filter((block) => block.messageId === messageId);
}

export function createBlock(messageId: string, content: string) {
  const newBlock: Block = {
    id: uuidv4(),
    messageId,
    content,
    type: BlockType.TEXT,
    metadata: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  blocks.push(newBlock);
  return newBlock;
}

let userdefaultModel = "GPT-4";

export async function getUserMetadata() {
  return {
    name: "John Doe",
    email: "john.doe@example.com",
    defaultModel: userdefaultModel
  };
}

export async function setUserDefaultModel(model: string) {
  userdefaultModel = model;
}