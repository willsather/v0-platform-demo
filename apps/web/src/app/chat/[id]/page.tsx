import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { v0 } from "v0-sdk";

import { ChatHistoryUpdater } from "@/app/components/chat-history-updater";
import { MessagesArea } from "@/app/components/messages-area";
import { PreviewArea } from "@/app/components/preview-area";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

interface ChatMessage {
  id: string;
  content: string;
  type: string;
  createdAt?: string;
}

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;

  const chat = await v0.chats.getById({ chatId: id });

  if (chat == null) {
    notFound();
  }

  return (
    <>
      <ChatHistoryUpdater chatId={id} chatData={chat} />
      <div className="min-h-[90vh] bg-gray-900 p-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-bold text-2xl text-white">Chat Session</h1>
              </div>
              <div className="flex items-center gap-2">
                {chat.url && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
                  >
                    <a
                      href={chat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      View on v0.dev
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <MessagesArea messages={chat.messages || []} />
            </div>

            <PreviewArea demoUrl={chat.demo} sourceUrl={chat.url} />
          </div>
        </div>
      </div>
    </>
  );
}
