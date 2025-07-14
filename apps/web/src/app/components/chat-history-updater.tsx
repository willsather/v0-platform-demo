"use client";

import { useEffect } from "react";
import type { ChatHistoryItem } from "./chat-sidebar";

interface ChatMessage {
  id: string;
  content: string;
  type: string;
  createdAt?: string;
}

interface Chat {
  id: string;
  url?: string;
  demo?: string;
  favorite?: boolean;
  messages?: ChatMessage[];
}

interface ChatHistoryUpdaterProps {
  chatId: string;
  chatData?: Chat;
}

export function ChatHistoryUpdater({
  chatId,
  chatData,
}: ChatHistoryUpdaterProps) {
  useEffect(() => {
    if (!chatData) return;

    const addOrUpdateChatInHistory = () => {
      try {
        const existingChats = localStorage.getItem("v0-chats");
        const chats = existingChats ? JSON.parse(existingChats) : [];

        // Check if chat already exists
        const existingChatIndex = chats.findIndex(
          (chat: ChatHistoryItem) => chat.id === chatId,
        );

        if (existingChatIndex === -1) {
          // Chat doesn't exist, add it
          const newChatData: ChatHistoryItem = {
            id: chatId,
            title: chatData.messages?.[0]?.content || `Chat ${chatId}`,
            createdAt: new Date().toISOString(),
            url: chatData.url,
          };

          chats.unshift(newChatData);
          localStorage.setItem("v0-chats", JSON.stringify(chats));
        }
      } catch (error) {
        console.error("Error updating chat history:", error);
      }
    };

    addOrUpdateChatInHistory();
  }, [chatId, chatData]);

  return null;
}
