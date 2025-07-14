"use client";

import { ArrowUp } from "lucide-react";
import { useState } from "react";

import { createMessage } from "@/app/actions/chat-actions";
import { Button } from "@repo/ui/components/button";

export function MessageInput({
  chatId,
}: {
  chatId: string;
}) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const result = await createMessage(chatId, message.trim());
      if (result.success) {
        setMessage("");
        // The page will revalidate and show the new message
      } else {
        console.error("Failed to send message:", result.error);
        // You might want to show an error toast here
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="min-h-2 w-full resize-none rounded-md border border-gray-600 bg-gray-700 px-3 py-2 pr-12 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="absolute right-4 bottom-4 h-8 w-8 rounded-full bg-blue-600 p-0 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <ArrowUp className="size-4" />
          )}
        </Button>
      </div>
    </form>
  );
}
