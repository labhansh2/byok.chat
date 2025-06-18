import { useState } from "react";
import { Message, Block } from "@/types/chat";
import { Copy, Check } from "lucide-react";

import TypingIndicator from "@/components/chat/messages/TypingIndicator";

interface AssistantMessageProps {
  message: Message & { blocks: Block[] };
  isStreaming?: boolean;
  isLatestMessage?: boolean;
}

export default function AssistantMessage({
  message,
  isStreaming = false,
  isLatestMessage = false,
}: AssistantMessageProps) {
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const copyToClipboard = async () => {
    const content = message.blocks.map((block) => block.content).join("\n\n");
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(message.id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="px-4 py-4">
          {message.blocks.map((block, index) => (
            <div
              key={block.id}
              className={`${index > 0 ? "mt-4" : ""} text-foreground leading-relaxed`}
            >
              <p className="mb-4 text-base leading-7 whitespace-pre-wrap">
                {block.content}
              </p>
            </div>
          ))}

          {/* Show typing indicator for assistant when streaming */}
          {isStreaming && isLatestMessage && <TypingIndicator />}
        </div>

        {/* Copy Button - only show if not currently streaming this message */}
        {!(isStreaming && isLatestMessage) && (
          <div className="flex justify-end px-4 pb-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary rounded-md transition-colors"
            >
              {copiedMessageId === message.id ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
