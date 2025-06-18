"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ChevronUp } from "lucide-react";
import { setDefaultModel } from "@/actions/test";

import ModelSelector from "@/components/chat/ModelSelector";

import { useChat } from "@/contexts/chat-context"; 
import { usePathname } from "next/navigation";

export default function PromptInput({ selectedModel }: { selectedModel: string }) {

  const { trigger, setTrigger, rendering, setRendering } = useChat();
  const [model, setModel] = useState(selectedModel);
  const [message, setMessage] = useState("");
  const [showModelSelector, setShowModelSelector] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelSelectorRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  
  console.log("pathname", pathname);  

  const onModelChange = (model: string) => {
    setModel(model);
    setDefaultModel(model);
    console.log("Model changed to:", model);
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // onSendMessage(message.trim());

      // save message to database
      // createMessage(message.trim());

      

      setMessage("");
      // Reset textarea height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      // if pathname is /chat/new, redirect to /chat/id
      // if (pathname === "/") {
      //   router.push(`/chat/${chatId}`);
      // }

      setRendering(true);
      setTrigger(Math.random() > 0.5 ? trigger + 1 : trigger - 1);
    }

  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
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
    onModelChange?.(model);
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
              placeholder="Type your message..."
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
      </div>
    </div>
  );
} 