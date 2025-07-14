"use client";

import { Menu, MessageCircle, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";

export interface ChatHistoryItem {
  id: string;
  title: string;
  createdAt: string;
  url?: string;
}

export function ChatSidebar() {
  const [chats, setChats] = useState<ChatHistoryItem[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    loadChats();
    // Load minimized state from localStorage
    const savedMinimized = localStorage.getItem("sidebar-minimized");
    if (savedMinimized) {
      setIsMinimized(JSON.parse(savedMinimized));
    }
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

  const toggleSidebar = () => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);
    localStorage.setItem("sidebar-minimized", JSON.stringify(newMinimized));
  };

  const truncateTitle = (title: string, maxLength = 30) => {
    if (title.length <= maxLength) return title;
    return `${title.substring(0, maxLength)}...`;
  };

  return (
    <div
      className={`overflow-y-auto border-gray-700 border-r bg-gray-900 transition-all duration-300 ${
        isMinimized ? "w-12" : "w-52"
      }`}
    >
      <div className={`${isMinimized ? "p-2" : "p-3"}`}>
        {/* Toggle Button */}
        <div
          className={`mb-3 flex items-center ${isMinimized ? "justify-center" : "justify-between"}`}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <Menu className="size-4" />
          </Button>
          {!isMinimized && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <Link href="/">
                <Plus className="h-3 w-3" />
              </Link>
            </Button>
          )}
        </div>

        {!isMinimized && (
          <>
            {/* Chat History Section */}
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-gray-200 text-sm">
                Recent Chats
              </h2>
            </div>

            <div className="space-y-1">
              {chats.length === 0 ? (
                <div className="py-6 text-center text-gray-500">
                  <MessageCircle className="mx-auto mb-2 h-6 w-6 opacity-50" />
                  <p className="text-xs">No chats yet</p>
                  <p className="text-xs">
                    Create your first chat to get started
                  </p>
                </div>
              ) : (
                chats.map((chat) => (
                  <Card
                    key={chat.id}
                    className={`rounded-lg border-gray-700 p-1.5 shadow-none transition-colors ${
                      pathname === `/chat/${chat.id}`
                        ? "border-gray-600 bg-gray-800"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={`/chat/${chat.id}`}
                        className="min-w-0 flex-1"
                      >
                        <div className="flex items-center">
                          <span className="truncate font-medium text-gray-200 text-sm">
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
                        className="h-5 w-5 p-0 text-gray-400 hover:bg-red-900/20 hover:text-red-400"
                      >
                        <Trash2 className="h-2.5 w-2.5" />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </>
        )}

        {/* Minimized state - show active chat indicator */}
        {isMinimized && chats.length > 0 && (
          <div className="mt-4 space-y-2">
            {chats.slice(0, 5).map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  pathname === `/chat/${chat.id}`
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
                title={chat.title}
              >
                <MessageCircle className="h-3 w-3" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
