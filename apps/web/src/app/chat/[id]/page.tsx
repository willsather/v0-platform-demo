import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Code, ExternalLink, Eye, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { v0 } from "v0-sdk";
import { ChatHistoryUpdater } from "../../components/chat-history-updater";

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
                <Badge
                  variant="secondary"
                  className="border-gray-700 bg-gray-800 text-gray-200"
                >
                  <MessageCircle className="mr-1 h-3 w-3" />
                  {chat.messages?.length || 0} messages
                </Badge>
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
            {/* Messages Section */}
            <div className="space-y-4">
              <Card className="border-gray-700 bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MessageCircle className="h-5 w-5" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chat.messages && chat.messages.length > 0 ? (
                      chat.messages.map((message: ChatMessage) => (
                        <div
                          key={message.id}
                          className="rounded-r-lg border-blue-400 border-l-4 bg-gray-900/50 py-2 pl-4"
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <Badge
                              variant={
                                message.type === "message"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                message.type === "message"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-700 text-gray-300"
                              }
                            >
                              {message.type === "message"
                                ? "Message"
                                : message.type}
                            </Badge>
                            {message.createdAt && (
                              <span className="text-gray-500 text-xs">
                                {new Date(message.createdAt).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="whitespace-pre-wrap text-gray-300 text-sm">
                            {message.content}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <MessageCircle className="mx-auto mb-2 h-12 w-12 opacity-50" />
                        <p>No messages found in this chat</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Info */}
              <Card className="border-gray-700 bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Chat Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Chat ID:</span>
                      <span className="font-mono text-gray-300 text-xs">
                        {chat.id}
                      </span>
                    </div>
                    {chat.url && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">URL:</span>
                        <a
                          href={chat.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 text-xs hover:underline"
                        >
                          View on v0.dev
                        </a>
                      </div>
                    )}
                    {chat.demo && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Demo:</span>
                        <a
                          href={chat.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 text-xs hover:underline"
                        >
                          View preview
                        </a>
                      </div>
                    )}
                    {chat.favorite !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Favorite:</span>
                        <Badge
                          variant={chat.favorite ? "default" : "secondary"}
                          className={
                            chat.favorite
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 text-gray-300"
                          }
                        >
                          {chat.favorite ? "Yes" : "No"}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div>
              <Card className="h-full border-gray-700 bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {chat.demo ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
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
                            <Code className="mr-1 h-3 w-3" />
                            View source
                          </a>
                        </Button>
                      </div>
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
