import { useState } from "react";
import { Message, Block, MessageRole } from "@/types/chat";
import { streamOpenRouterResponseWithLocalStorage } from "@/lib/llm-providers/open-router";
import { OpenRouterRequest } from "@/types/open-router";
import { createMessage, createBlock } from "@/lib/server";
import { Dispatch, SetStateAction } from "react";

interface MessageWithBlocks extends Message {
  blocks: Block[];
}

interface UseAIResponseProps {
  threadId: string;
  model: string;
  messages: MessageWithBlocks[];
  setMessages: Dispatch<SetStateAction<MessageWithBlocks[]>>;
  setRendering: (rendering: boolean) => void;
}

export function useAIResponse({ 
  threadId, 
  model, 
  messages, 
  setMessages, 
  setRendering 
}: UseAIResponseProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  // Map our model names to OpenRouter model names
  const getOpenRouterModelName = (modelName: string): string => {
    const modelMap: Record<string, string> = {
      "GPT-4": "openai/gpt-4",
      "GPT-3.5 Turbo": "openai/gpt-3.5-turbo",
      "Claude 3 Opus": "anthropic/claude-3-opus",
      "Claude 3 Sonnet": "anthropic/claude-3-5-sonnet",
      "Gemini Pro": "google/gemini-pro",
      "Llama 2 70B": "meta-llama/llama-2-70b-chat",
    };
    
    return modelMap[modelName] || "google/gemini-2.0-flash-001"; // Default fallback
  };

  const generateAIResponse = async () => {
    if (isGenerating) return;
    
    console.log("Starting AI response generation");
    console.log("Current messages:", messages);
    
    setIsGenerating(true);
    
    try {
      // Build conversation history for the API (this already includes all messages)
      const conversationHistory = messages.map((msg) => ({
        role: (msg.role === MessageRole.USER ? "user" : "assistant") as "user" | "assistant",
        content: msg.blocks.map(block => block.content).join('\n\n'),
      }));

      console.log("Conversation history for API:", conversationHistory);

      const request: OpenRouterRequest = {
        model: getOpenRouterModelName(model),
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. Provide clear, accurate, and helpful responses.",
          },
          ...conversationHistory,
        ],
        stream: true,
      };

      console.log("OpenRouter request:", request);

      // Create assistant message
      const assistantMessage = createMessage(threadId, MessageRole.ASSISTANT);
      console.log("Created assistant message:", assistantMessage);
      
      // Initialize the assistant message in the UI
      const newAssistantMessage: MessageWithBlocks = {
        ...assistantMessage,
        role: MessageRole.ASSISTANT,
        blocks: [],
      };
      
      console.log("Adding assistant message to state:", newAssistantMessage);
      setMessages(prev => [...prev, newAssistantMessage]);

      let streamedContent = "";
      const tempBlockId = `temp-${assistantMessage.id}`;

      for await (const chunk of streamOpenRouterResponseWithLocalStorage(request)) {
        streamedContent += chunk;

        // Update the UI with the streamed content (using temporary block)
        setMessages(prev => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage && lastMessage.role === MessageRole.ASSISTANT) {
            lastMessage.blocks = [{
              id: tempBlockId,
              messageId: assistantMessage.id,
              content: streamedContent,
              type: "text" as any,
              metadata: {},
              createdAt: new Date(),
              updatedAt: new Date(),
            }];
          }
          return updated;
        });
      }

      // Save the final block content only once after streaming completes
      if (streamedContent) {
        const finalBlock = createBlock(assistantMessage.id, streamedContent);
        
        // Update the UI with the final block (replacing the temporary one)
        setMessages(prev => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage && lastMessage.role === MessageRole.ASSISTANT) {
            lastMessage.blocks = [finalBlock];
          }
          return updated;
        });
      }

    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Show error message
      const errorMessage: MessageWithBlocks = {
        id: `error-${Date.now()}`,
        threadId: threadId,
        role: MessageRole.ASSISTANT,
        createdAt: new Date(),
        updatedAt: new Date(),
        blocks: [{
          id: `error-block-${Date.now()}`,
          messageId: `error-${Date.now()}`,
          content: "I apologize, but I encountered an error while processing your request. Please try again.",
          type: "text" as any,
          metadata: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        }]
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
      setRendering(false);
    }
  };

  return {
    generateAIResponse,
    isGenerating,
  };
} 