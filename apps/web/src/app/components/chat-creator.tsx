"use client";

import { Button } from "@repo/ui/components/button";
import { ArrowUp, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createChat } from "../actions/chat-actions";
import type { ChatHistoryItem } from "./chat-sidebar";

function FormContent({
  message,
  setMessage,
}: { message: string; setMessage: (value: string) => void }) {
  const { pending } = useFormStatus();

  return (
    <div className="relative">
      <textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Build a landing page for a banana stand"
        className="max-h-40 min-h-[60px] w-full resize-none rounded-2xl border border-gray-700 bg-gray-800 p-4 pr-12 text-white placeholder-gray-400 focus:border-gray-600 focus:outline-none focus:ring-0 disabled:opacity-50"
        required
        disabled={pending}
      />
      <Button
        type="submit"
        disabled={pending || !message.trim()}
        className={`absolute right-4 bottom-4 h-8 w-8 rounded-full p-0 transition-colors ${
          pending || !message.trim()
            ? "cursor-not-allowed bg-gray-600 text-gray-400"
            : "bg-white text-gray-900 hover:bg-gray-100"
        }`}
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <ArrowUp className="size-4" />
        )}
      </Button>
    </div>
  );
}

export function ChatCreator() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
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
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      setError("Failed to create chat");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  const suggestions = [
    "Build a pricing section",
    "Design a contact form",
    "Make a dashboard with charts",
  ];

  return (
    <div className="relative">
      <form action={handleSubmit} className="space-y-6">
        {/* Main input */}
        <FormContent message={message} setMessage={setMessage} />

        {error && (
          <div className="text-center text-red-400 text-sm">{error}</div>
        )}

        {/* Suggestion buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant="outline"
              onClick={() => handleSuggestionClick(suggestion)}
              className="rounded-full border-gray-600 bg-transparent text-gray-300 hover:border-gray-500 hover:bg-gray-800 hover:text-white disabled:opacity-50"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </form>
    </div>
  );
}
