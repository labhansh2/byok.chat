"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Lightbulb,
  Code,
  FileText,
  Sparkles,
  Key,
} from "lucide-react";
import { hasApiKey, setApiKey, removeApiKey, validateApiKey } from "@/lib/api-key-utils";

interface ChatAreaProps {
  chatId?: string;
}

export default function ChatAreaPlaceholder() {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if API key exists in localStorage
    setHasStoredKey(hasApiKey());
  }, []);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) return;

    setIsSubmitting(true);
    setError("");
    
    try {
      // Validate the API key format
      if (!validateApiKey(apiKeyInput)) {
        setError("Invalid API key format. OpenRouter keys should start with 'sk-or-v1-'");
        return;
      }

      // Store the API key in localStorage
      setApiKey(apiKeyInput);
      setHasStoredKey(true);
      setApiKeyInput("");
    } catch (error) {
      console.error("Error storing API key:", error);
      setError("Failed to store API key. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearKey = () => {
    if (confirm("Are you sure you want to remove your stored API key?")) {
      removeApiKey();
      setHasStoredKey(false);
    }
  };

  const suggestions = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Brainstorm ideas",
      description: "Generate creative solutions for your projects",
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Code assistance",
      description: "Get help with programming and debugging",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Write content",
      description: "Create articles, emails, and documentation",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Creative writing",
      description: "Stories, poems, and creative content",
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
          <h1 className="text-2xl font-semibold mb-4">Welcome to BYOK Chat</h1>
          
          {!hasStoredKey ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-muted-foreground/80">
                <Key className="w-4 h-4" />
                <p className="text-sm">
                  To start chatting, add your{" "}
                  <a 
                    href="https://openrouter.ai/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    OpenRouter API key
                  </a>
                </p>
              </div>
              
              <div className="border border-border/50 rounded-lg p-4 max-w-lg mx-auto">
                <form onSubmit={handleApiKeySubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="sk-or-v1-..."
                      className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      disabled={!apiKeyInput.trim() || isSubmitting}
                      className="px-4 py-2 text-sm bg-foreground text-background rounded-md hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? "..." : "Save"}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs">{error}</p>
                  )}
                </form>
                
                <p className="text-xs text-muted-foreground/60 mt-3 text-center">
                  Stored locally in your browser
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg mb-2">Start a conversation with any AI model</p>
              <p className="text-sm mb-4">Type your message below to begin</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {suggestion.icon}
                      <span className="font-medium text-foreground">{suggestion.title}</span>
                    </div>
                    <p className="text-sm">{suggestion.description}</p>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleClearKey}
                className="mt-6 text-xs text-muted-foreground hover:text-foreground underline"
              >
                Remove stored API key
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
