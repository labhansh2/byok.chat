interface Thread {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

interface Message {
  id: string;
  role: "user" | "assistant";
  createdAt: Date;
  updatedAt: Date;
  content: Chunk[];
}

enum ChunkType {
  Audio = "audio",
  BulletedListItem = "bulleted_list_item",
  Callout = "callout",
  Code = "code",
  ColumnList = "column_list",
  Column = "column",
  Divider = "divider",
  Equation = "equation",
  File = "file",
  Heading1 = "heading_1",
  Heading2 = "heading_2",
  Heading3 = "heading_3",
  Image = "image",
  LinkPreview = "link_preview",
  Mention = "mention",
  NumberedListItem = "numbered_list_item",
  Paragraph = "paragraph",
  PDF = "pdf",
  Quote = "quote",
  Table = "table",
  ToDo = "to_do",
  Toggle = "toggle",
}

interface Chunk {
  id: string;
  type: ChunkType;
  createdAt: Date;
  updatedAt: Date;
}
