"use client";

import { useState, useRef, useEffect } from "react";
import ModelSelector from "./ModelSelector";

interface PromptInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export default function PromptInput({ onSendMessage, disabled, selectedModel, onModelChange }: PromptInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="relative">
          {/* Large Chat Input */}
          <div className="relative bg-input border border-border rounded-xl shadow-sm">
            {/* Model Selector inside the chat box */}
            <div className="flex items-center justify-between p-3 border-b border-border">
              <ModelSelector 
                selectedModel={selectedModel}
                onModelChange={onModelChange}
              />
            </div>
            
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message AI..."
                disabled={disabled}
                className="w-full resize-none bg-transparent text-foreground placeholder-muted-foreground px-6 py-6 pr-16 focus:outline-none min-h-[80px] max-h-[300px] text-base leading-relaxed"
                rows={3}
              />
              <button
                type="submit"
                disabled={!message.trim() || disabled}
                className="absolute right-3 bottom-3 p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 