import { ExternalLink, Eye } from "lucide-react";
import { notFound } from "next/navigation";
import { v0 } from "v0-sdk";

import { ChatHistoryUpdater } from "@/app/components/chat-history-updater";
import { MessagesArea } from "@/app/components/messages-area";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { ScrollArea } from "@repo/ui/components/scroll-area";

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
      <div className="min-h-screen bg-gray-900 p-4">
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

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <MessagesArea messages={chat.messages || []} />

            <Card className="flex h-[calc(100vh-8rem)] flex-col border-gray-700 bg-gray-800">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex justify-between items-center gap-2 text-white">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Preview
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
                  >
                    <a
                      href={chat.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Open in new tab
                    </a>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full px-6">
                  {chat.demo ? (
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-lg border border-gray-700">
                        <iframe
                          src={chat.demo}
                          className="h-96 w-full border-0"
                          title="Generated Component Preview"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-gray-500">
                      <Eye className="mx-auto mb-2 h-12 w-12 opacity-50" />
                      <p>No preview available for this chat</p>
                      <p className="mt-1 text-xs">
                        The AI may not have generated any code yet
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
