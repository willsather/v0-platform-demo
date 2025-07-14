"use client";

import { Badge } from "@repo/ui/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

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
              {message.createdAt && (
                <span className="text-gray-500 text-xs">
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              )}
            </div>
            <div className="prose prose-sm prose-invert max-w-none prose-code:text-gray-200 prose-headings:text-gray-200 prose-li:text-gray-300 prose-ol:text-gray-300 prose-strong:text-gray-200 prose-ul:text-gray-300 text-gray-300">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {/* V0 Avatar */}
      <div className="flex-shrink-0">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
          <span className="font-bold text-white text-xs">v0</span>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-1">
          {message.createdAt && (
            <span className="text-gray-500 text-xs">
              {new Date(message.createdAt).toLocaleString()}
            </span>
          )}
        </div>

        {/* Thinking Section */}
        {thinkingContent && (
          <div className="rounded-lg border border-amber-400/20 bg-amber-50/5 p-2">
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
              <span className="font-medium text-amber-400 text-xs">
                Thinking
              </span>
            </button>
            {isThinkingExpanded && (
              <div className="mt-2 whitespace-pre-wrap text-gray-300 text-xs leading-relaxed">
                {thinkingContent}
              </div>
            )}
          </div>
        )}

        {/* Files Section */}
        {codeProjectContent && (
          <div className="rounded-lg border border-green-400/20 bg-green-50/5 p-2">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-medium text-green-400 text-xs">Files</span>
            </div>

            <div className="space-y-1">
              <FilesList content={codeProjectContent} />
            </div>
          </div>
        )}

        {/* Normal Response Text */}
        {normalContent && (
          <div className="rounded-lg border border-gray-600/20 bg-gray-800/30 p-2">
            <div className="prose prose-xs prose-invert max-w-none prose-code:text-xs prose-headings:text-xs prose-li:text-xs prose-ol:text-xs prose-strong:text-xs prose-ul:text-xs text-xs leading-relaxed">
              <ReactMarkdown>{normalContent}</ReactMarkdown>
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
    <div className="space-y-1">
      {matches.map((match, index) => {
        const [, , fileName] = match;
        const uniqueKey = `${fileName}-${index}`;
        return (
          <div
            key={uniqueKey}
            className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800/50 px-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full bg-gray-400 p-0.5">
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
    <Card className="flex h-[calc(100vh-12rem)] flex-col border-gray-700 bg-gray-800">
      <CardHeader className="flex-shrink-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm text-white">
          <MessageCircle className="h-3 w-3" />
          Messages
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-4">
          <div className="space-y-4 py-4">
            {messages && messages.length > 0 ? (
              messages.map((message: ChatMessage) => (
                <div key={message.id}>
                  {message.type === "message" &&
                  (message.content.includes("<Thinking>") ||
                    message.content.includes("<CodeProject")) ? (
                    <V0Message message={message} />
                  ) : (
                    <div className="flex gap-2">
                      {/* User Avatar */}
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
                      </div>

                      <div className="flex-1">
                        <div className="rounded-r-lg border-blue-400 border-l-3 bg-gray-900/50 py-1.5 pl-3">
                          <div className="mb-1 flex items-center gap-1">
                            {message.createdAt && (
                              <span className="text-gray-500 text-xs">
                                {new Date(message.createdAt).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="prose prose-xs prose-invert max-w-none prose-code:text-xs prose-headings:text-xs prose-li:text-xs prose-ol:text-xs prose-strong:text-xs prose-ul:text-xs text-xs">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-gray-500">
                <MessageCircle className="mx-auto mb-2 h-6 w-6 opacity-50" />
                <p className="text-xs">No messages found in this chat</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
