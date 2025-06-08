"use client";

import { useState } from "react";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const AVAILABLE_MODELS = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI" },
  { id: "claude-3", name: "Claude 3", provider: "Anthropic" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
  { id: "llama-2", name: "Llama 2", provider: "Meta" },
];

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentModel = AVAILABLE_MODELS.find(model => model.id === selectedModel) || AVAILABLE_MODELS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-transparent border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors"
      >
        <span className="text-foreground">{currentModel.name}</span>
        <svg 
          className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 bottom-full mb-1 w-56 bg-input border border-border rounded-md shadow-lg z-20">
            <div className="py-1">
              {AVAILABLE_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    onModelChange(model.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors ${
                    selectedModel === model.id ? 'bg-accent text-accent-foreground' : 'text-foreground'
                  }`}
                >
                  <div className="font-medium">{model.name}</div>
                  <div className="text-xs text-muted-foreground">{model.provider}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 