"use client";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { MessageCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createChat } from "../actions/chat-actions";
import type { ChatHistoryItem } from "./chat-sidebar";

export function ChatCreator() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const addChatToHistory = (chatData: ChatHistoryItem) => {
    try {
      const existingChats = localStorage.getItem("v0-chats");
      const chats = existingChats ? JSON.parse(existingChats) : [];

      // Avoid duplicates
      const updatedChats = chats.filter(
        (chat: ChatHistoryItem) => chat.id !== chatData.id,
      );
      updatedChats.unshift(chatData);

      localStorage.setItem("v0-chats", JSON.stringify(updatedChats));
    } catch (error) {
      console.error("Error saving chat to history:", error);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsCreating(true);
    setError(null);

    try {
      const result = await createChat(formData);

      if (result.success && result.chatData) {
        // Add to localStorage
        addChatToHistory(result.chatData);

        // Navigate to the chat
        router.push(`/chat/${result.chatData.id}`);
      } else {
        setError(result.error || "Failed to create chat");
        setIsCreating(false);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      setError("Failed to create chat");
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Create New Chat
        </CardTitle>
        <CardDescription>
          Tell me what you want to build and I'll create a beautiful React
          component for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <textarea
              name="message"
              placeholder="e.g., Create a responsive navbar with dark mode toggle, or Build a pricing section with three tiers..."
              className="min-h-32 w-full resize-none rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              required
              disabled={isCreating}
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex justify-end">
            <Button type="submit" className="gap-2" disabled={isCreating}>
              {isCreating ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Component
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
