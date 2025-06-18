import {
    OpenRouterRequest,
    OpenRouterResponse,
    StreamChunk,
  } from "@/types/open-router";
  import { getApiKey } from "@/lib/api-key-utils";
  
  const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

  // Get API key from localStorage
  function getOpenRouterApiKey(): string {
    if (typeof window === 'undefined') {
      throw new Error("API key access is only available on the client side");
    }
    
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error("OpenRouter API key not found. Please add your API key in the chat interface.");
    }
    return apiKey;
  }

  // Wrapper function that uses localStorage for API key
  export async function* streamOpenRouterResponseWithLocalStorage(
    request: OpenRouterRequest,
  ): AsyncGenerator<string, void, unknown> {
    const apiKey = getOpenRouterApiKey();
    yield* streamOpenRouterResponse(request, apiKey);
  }

  // Wrapper function that uses localStorage for API key
  export async function getOpenRouterResponseWithLocalStorage(
    request: OpenRouterRequest,
  ): Promise<OpenRouterResponse> {
    const apiKey = getOpenRouterApiKey();
    return getOpenRouterResponse(request, apiKey);
  }
  
  export async function* streamOpenRouterResponse(
    request: OpenRouterRequest,
    apiKey: string,
  ): AsyncGenerator<string, void, unknown> {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        //   'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
      },
      body: JSON.stringify({
        ...request,
        stream: true,
      }),
    });
  
    console.log(typeof response);
  
    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      throw new Error(
        `OpenRouter API error: ${error.error || response.statusText}`,
      );
    }
  
    if (!response.body) {
      throw new Error("Response body is null");
    }
  
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
  
    try {
      while (true) {
        const { done, value } = await reader.read();
  
        if (done) {
          break;
        }
  
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
  
        for (const line of lines) {
          if (line.trim() === "") continue;
          if (line.trim() === "data: [DONE]") continue;
  
          try {
            const jsonStr = line.replace(/^data: /, "");
            
            // Skip empty JSON strings
            if (!jsonStr.trim()) continue;
            
            const chunk: StreamChunk = JSON.parse(jsonStr);

            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch (e) {
            console.error("Error parsing chunk:", e);
            console.error("Failed line:", line);
            console.error("Failed JSON string:", line.replace(/^data: /, ""));
            // Continue processing other lines instead of breaking
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
  
  export async function getOpenRouterResponse(
    request: OpenRouterRequest,
    apiKey: string,
  ): Promise<OpenRouterResponse> {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer":
          typeof window !== "undefined"
            ? window.location.origin
            : "http://localhost:3000",
      },
      body: JSON.stringify({
        ...request,
        stream: false,
      }),
    });
  
    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      throw new Error(
        `OpenRouter API error: ${error.error || response.statusText}`,
      );
    }
  
    return response.json();
  }
  