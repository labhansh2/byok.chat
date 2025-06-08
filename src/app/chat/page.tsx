"use client";

import React, { useState, useRef, useCallback } from "react";
import Sidebar from "../../components/chat/Sidebar";
import ChatArea from "../../components/chat/ChatArea";

export default function ChatPage() {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 400) {
        setSidebarWidth(newWidth);
      }
    },
    [isResizing]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Add event listeners for mouse move and up
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex h-screen bg-background">
      <div 
        ref={sidebarRef}
        className="relative bg-muted border-r border-border flex flex-col h-full"
        style={{ width: `${sidebarWidth}px` }}
      >
        <Sidebar 
          currentChatId={currentChatId}
          onChatSelect={setCurrentChatId}
        />
        
        {/* Resize handle */}
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-border transition-colors bg-transparent"
          onMouseDown={handleMouseDown}
        />
      </div>
      
      <ChatArea 
        chatId={currentChatId}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />
    </div>
  );
} 