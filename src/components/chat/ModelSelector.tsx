"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface ModelSelectorProps {
  onSelectModel: (model: string) => void;
  onClose: () => void;
  focusOnOpen?: boolean;
}

// Mock model data - you can replace this with real data later
const SAMPLE_MODELS = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI" },
  { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic" },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
  { id: "llama-2-70b", name: "Llama 2 70B", provider: "Meta" },
];

export default function ModelSelector({
  onSelectModel,
  onClose,
  focusOnOpen = false,
}: ModelSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredModels, setFilteredModels] = useState(SAMPLE_MODELS);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter models based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredModels(SAMPLE_MODELS);
    } else {
      const filtered = SAMPLE_MODELS.filter(
        (model) =>
          model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          model.provider.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredModels(filtered);
    }
  }, [searchQuery]);

  // Focus search input when component mounts if requested
  useEffect(() => {
    if (focusOnOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [focusOnOpen]);

  const handleModelSelect = (model: (typeof SAMPLE_MODELS)[0]) => {
    onSelectModel(model.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold">Select Model</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-secondary rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter model name"
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
          />
        </div>
      </div>

      {/* Model Tiles */}
      <div className="max-h-64 overflow-y-auto">
        {filteredModels.length > 0 ? (
          <div className="p-2">
            {filteredModels.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model)}
                className="w-full p-3 text-left hover:bg-secondary rounded-lg transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{model.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {model.provider}
                    </div>
                  </div>
                  {/* <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary/30 rounded"></div>
                  </div> */}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No models found</p>
            <p className="text-xs">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/5">
        <p className="text-xs text-muted-foreground">
          Tip: Type{" "}
          <code className="px-1 py-0.5 bg-muted rounded">#model:</code> in the
          chat to quickly open this selector
        </p>
      </div>
    </div>
  );
}
