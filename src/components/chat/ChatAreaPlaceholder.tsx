"use client";

import { MessageCircle, Lightbulb, Code, FileText, Sparkles } from "lucide-react";

interface ChatAreaProps {
  chatId?: string;
}

export default function ChatAreaPlaceholder() {
  const suggestions = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Brainstorm ideas",
      description: "Generate creative solutions for your projects"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Code assistance",
      description: "Get help with programming and debugging"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Write content",
      description: "Create articles, emails, and documentation"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Creative writing",
      description: "Stories, poems, and creative content"
    }
  ];

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
        {/* Main Welcome Section */}
        <div className="text-center mb-12">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl rounded-full"></div>
            <div className="relative bg-secondary border border-border rounded-full p-6 inline-flex">
              <MessageCircle className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
            Start a new conversation
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Ask me anything or choose from the suggestions below to get started
          </p>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="group p-6 bg-secondary/50 border border-border rounded-xl hover:bg-secondary/80 hover:border-border/80 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent/50 rounded-lg group-hover:bg-accent/70 transition-colors">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-primary mb-1 group-hover:text-primary/90 transition-colors">
                    {suggestion.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Hint */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground/70">
            Type <span className="px-2 py-1 bg-accent/30 rounded text-xs font-mono">#model:</span> to quickly switch AI models
          </p>
        </div>
      </div>
    </div>
  );
} 