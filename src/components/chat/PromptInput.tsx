"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

import ModelSelector from "@/components/chat/ModelSelector";
import { createThread, createMessage, createBlock } from "@/lib/server";

import { useChat } from "@/contexts/chat-context";
import { usePathname } from "next/navigation";

export default function PromptInput() {
  const { trigger, setTrigger, rendering, setRendering, model, setModel } =
    useChat();
  const [message, setMessage] = useState("");

  // input states
  const [showModelSelector, setShowModelSelector] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelSelectorRef = useRef<HTMLDivElement>(null);

  // Real-time blocks tracking (behind the scenes)
  const [realtimeBlocks, setRealtimeBlocks] = useState<string[]>([]);

  const pathname = usePathname();
  const router = useRouter();

  const onModelChange = (model: string) => {
    setModel(model);
    console.log("Model changed to:", model);
  };

  // Update blocks in real-time as user types
  useEffect(() => {
    if (message.trim()) {
      const paragraphs = message.split('\n').map(p => p.trim()).filter(p => p.length > 0);
      setRealtimeBlocks(paragraphs);
      console.log("Real-time blocks updated:", paragraphs);
    } else {
      setRealtimeBlocks([]);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    // Use the real-time blocks that were already created
    const blocksToSubmit = realtimeBlocks;

    if (pathname === "/") {
      // Create new thread with all blocks
      try {
        // Generate title from first block
        const title = blocksToSubmit[0].substring(0, 50) + (blocksToSubmit[0].length > 50 ? "..." : "");
        
        // Create thread
        const thread = createThread(title);
        console.log("Created thread:", thread);

        // Create user message
        const userMessage = createMessage(thread.id);
        console.log("Created message:", userMessage);

        // Create blocks for each paragraph
        const createdBlocks = blocksToSubmit.map(blockContent => 
          createBlock(userMessage.id, blockContent)
        );
        console.log("Created blocks:", createdBlocks);

        // Route to the new thread
        router.push(`/chat/${thread.id}`);
      } catch (error) {
        console.error("Error creating thread:", error);
      }
    } else {
      // Handle existing thread - extract thread ID from pathname
      const threadId = pathname.split('/')[2];
      if (threadId) {
        try {
          // Create user message for existing thread
          const userMessage = createMessage(threadId);
          console.log("Created message for existing thread:", userMessage);

          // Create blocks for each paragraph
          const createdBlocks = blocksToSubmit.map(blockContent => 
            createBlock(userMessage.id, blockContent)
          );
          console.log("Created blocks:", createdBlocks);
        } catch (error) {
          console.error("Error creating message:", error);
        }
      }
    }

    // Reset states
    setMessage("");
    setRealtimeBlocks([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setRendering(true);
    setTrigger(Math.random() > 0.5 ? trigger + 1 : trigger - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    // Shift+Enter will naturally create new lines - blocks will be updated via useEffect
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    // Check for #model: trigger
    if (value.endsWith("#model:")) {
      setShowModelSelector(true);
      // Remove the trigger text
      setMessage(value.slice(0, -7));
    }
  };

  const handleModelSelect = (model: string) => {
    onModelChange(model);
    setShowModelSelector(false);
    // Focus back on textarea
    textareaRef.current?.focus();
  };

  // Close model selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modelSelectorRef.current &&
        !modelSelectorRef.current.contains(event.target as Node) &&
        !textareaRef.current?.contains(event.target as Node)
      ) {
        setShowModelSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="relative w-full max-w-3xl">
        {/* Model Selector Modal */}
        {showModelSelector && (
          <div
            ref={modelSelectorRef}
            className="absolute bottom-full left-0 right-0 mb-2 z-50"
          >
            <ModelSelector
              onSelectModel={handleModelSelect}
              onClose={() => setShowModelSelector(false)}
              focusOnOpen={message.length === 0} // Focus search when opened via #model:
            />
          </div>
        )}

        {/* Prompt Input Container */}
        <form onSubmit={handleSubmit}>
          <div className="border border-border rounded-lg bg-background shadow-sm">
            {/* Text Input */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Shift+Enter for new line)"
              className="w-full min-h-[60px] max-h-48 px-4 py-4 resize-none focus:outline-none bg-transparent overflow-hidden"
              rows={1}
            />
            
            {/* Controls Row */}
            <div className="flex items-center justify-between px-4 pb-3">
              {/* Model Selector Button */}
              <button
                type="button"
                onClick={() => setShowModelSelector(!showModelSelector)}
                className="flex items-center gap-2 px-3 py-1.5 bg-secondary border border-border rounded-md hover:bg-secondary/80 transition-colors text-sm"
              >
                <span className="font-medium">{model}</span>
                <ChevronUp className="w-3 h-3" />
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!message.trim()}
                className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Helper text */}
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Press Shift+Enter for new lines, Enter to send message
        </div>
      </div>
    </div>
  );
}
