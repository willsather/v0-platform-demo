"use client";

import { Badge } from "@repo/ui/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

interface ChatMessage {
  id: string;
  content: string;
  type: string;
  createdAt?: string;
}

interface MessagesAreaProps {
  messages: ChatMessage[];
}

// Component to parse and display v0 messages with Thinking and CodeProject sections
function V0Message({ message }: { message: ChatMessage }) {
  const content = message.content;
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(false);

  // Parse the content to extract Thinking and CodeProject sections
  const thinkingMatch = content.match(/<Thinking>([\s\S]*?)<\/Thinking>/);
  const codeProjectMatch = content.match(
    /<CodeProject[^>]*>([\s\S]*?)<\/CodeProject>/,
  );

  const thinkingContent = thinkingMatch?.[1]?.trim() || null;
  const codeProjectContent = codeProjectMatch?.[1]?.trim() || null;

  // Extract the normal text content (content outside of Thinking and CodeProject sections)
  let normalContent = content;
  if (thinkingMatch) {
    normalContent = normalContent.replace(thinkingMatch[0], "");
  }
  if (codeProjectMatch) {
    normalContent = normalContent.replace(codeProjectMatch[0], "");
  }
  normalContent = normalContent.trim();

  // If no special sections found, display as regular message
  if (!thinkingContent && !codeProjectContent && !normalContent) {
    return (
      <div className="flex gap-3">
        {/* V0 Avatar */}
        <div className="flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
            <span className="font-bold text-white text-xs">v0</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="rounded-r-lg border-blue-400 border-l-4 bg-gray-900/50 py-2 pl-4">
            <div className="mb-1 flex items-center gap-2">
              <Badge variant="default" className="bg-blue-600 text-white">
                v0
              </Badge>
              {message.createdAt && (
                <span className="text-gray-500 text-xs">
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              )}
            </div>
            <p className="whitespace-pre-wrap text-gray-300 text-sm">
              {content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      {/* V0 Avatar */}
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
          <span className="font-bold text-white text-xs">v0</span>
        </div>
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-blue-600 text-white">
            v0
          </Badge>
          {message.createdAt && (
            <span className="text-gray-500 text-xs">
              {new Date(message.createdAt).toLocaleString()}
            </span>
          )}
        </div>

        {/* Thinking Section */}
        {thinkingContent && (
          <div className="rounded-lg border border-amber-400/20 bg-amber-50/5 p-4">
            <button
              type="button"
              onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
              className="flex w-full items-center gap-2 text-left hover:opacity-80"
            >
              {isThinkingExpanded ? (
                <ChevronDown className="size-3 text-amber-400" />
              ) : (
                <ChevronRight className="size-3 text-amber-400" />
              )}
              <span className="font-medium text-amber-400 text-sm">
                Thinking
              </span>
            </button>
            {isThinkingExpanded && (
              <div className="mt-2 whitespace-pre-wrap text-gray-300 text-sm leading-relaxed">
                {thinkingContent}
              </div>
            )}
          </div>
        )}

        {/* Files Section */}
        {codeProjectContent && (
          <div className="rounded-lg border border-green-400/20 bg-green-50/5 p-3">
            <div className="mb-3 flex items-center gap-2">
              <span className="font-medium text-green-400 text-sm">Files</span>
            </div>

            <div className="space-y-2">
              <FilesList content={codeProjectContent} />
            </div>
          </div>
        )}

        {/* Normal Response Text */}
        {normalContent && (
          <div className="rounded-lg border border-gray-600/20 bg-gray-800/30 p-4">
            <div className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed">
              {normalContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Component to display a list of file names from CodeProject
function FilesList({ content }: { content: string }) {
  // Parse code blocks with file names
  const codeBlockRegex = /```(\w+)?\s*file="([^"]+)"([\s\S]*?)```/g;
  const matches = Array.from(content.matchAll(codeBlockRegex));

  if (matches.length === 0) {
    return (
      <div className="whitespace-pre-wrap text-gray-300 text-xs">{content}</div>
    );
  }

  return (
    <div className="space-y-2">
      {matches.map((match, index) => {
        const [, , fileName] = match;
        const uniqueKey = `${fileName}-${index}`;
        return (
          <div
            key={uniqueKey}
            className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full bg-gray-400 p-1">
                <CheckCircle className="size-2" />
              </div>
              <span className="font-mono text-gray-300 text-xs">
                {fileName}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-gray-700 text-gray-300 text-xs hover:bg-gray-700"
            >
              Generated
            </Badge>
          </div>
        );
      })}
    </div>
  );
}

export function MessagesArea({ messages }: MessagesAreaProps) {
  return (
    <Card className="border-gray-700 bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <MessageCircle className="h-5 w-5" />
          Messages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {messages && messages.length > 0 ? (
            messages.map((message: ChatMessage) => (
              <div key={message.id}>
                {message.type === "message" &&
                (message.content.includes("<Thinking>") ||
                  message.content.includes("<CodeProject")) ? (
                  <V0Message message={message} />
                ) : (
                  <div className="flex gap-3">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
                    </div>

                    <div className="flex-1">
                      <div className="rounded-r-lg border-blue-400 border-l-4 bg-gray-900/50 py-2 pl-4">
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
                    </div>
                  </div>
                )}
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
  );
}
