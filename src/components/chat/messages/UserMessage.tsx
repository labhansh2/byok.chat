import { Message, Block } from "@/types/chat";

interface UserMessageProps {
  message: Message & { blocks: Block[] };
}

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl border border-border rounded-lg bg-background px-4 py-4">
        {message.blocks.map((block, index) => (
          <div key={block.id} className={index > 0 ? "mt-3" : ""}>
            {block.content}
          </div>
        ))}
      </div>
    </div>
  );
} 