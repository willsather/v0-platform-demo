"use client";

import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { MessageCircle, Plus, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export interface ChatHistoryItem {
  id: string;
  title: string;
  createdAt: string;
  url?: string;
}

export function ChatSidebar() {
  const [chats, setChats] = useState<ChatHistoryItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = () => {
    try {
      const savedChats = localStorage.getItem("v0-chats");
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        setChats(
          parsedChats.sort(
            (a: ChatHistoryItem, b: ChatHistoryItem) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );
      }
    } catch (error) {
      console.error("Error loading chats:", error);
    }
  };

  const deleteChat = (chatId: string) => {
    try {
      const updatedChats = chats.filter((chat) => chat.id !== chatId);
      setChats(updatedChats);
      localStorage.setItem("v0-chats", JSON.stringify(updatedChats));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const truncateTitle = (title: string, maxLength = 40) => {
    if (title.length <= maxLength) return title;
    return `${title.substring(0, maxLength)}...`;
  };

  return (
    <div className="h-screen w-64 overflow-y-auto border-gray-200 border-r bg-white">
      <div className="p-4">
        {/* Header with title */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <h1 className="font-bold text-gray-900 text-lg">
              v0 Platform Demo
            </h1>
          </div>
        </div>

        {/* Chat History Section */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Chats</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-2">
          {chats.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <MessageCircle className="mx-auto mb-2 h-8 w-8 opacity-50" />
              <p className="text-sm">No chats yet</p>
              <p className="text-xs">Create your first chat to get started</p>
            </div>
          ) : (
            chats.map((chat) => (
              <Card
                key={chat.id}
                className="rounded-lg p-2 shadow-none hover:bg-gray-50"
              >
                <div className="flex items-center justify-between gap-2">
                  <Link href={`/chat/${chat.id}`} className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-3 w-3 flex-shrink-0 text-gray-400" />
                      <span className="truncate font-medium text-gray-900 text-sm">
                        {truncateTitle(chat.title)}
                      </span>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteChat(chat.id);
                    }}
                    className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
