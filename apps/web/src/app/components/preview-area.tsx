"use client";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { ExternalLink, Eye } from "lucide-react";

interface PreviewAreaProps {
  demoUrl?: string;
  sourceUrl?: string;
}

export function PreviewArea({ demoUrl, sourceUrl }: PreviewAreaProps) {
  return (
    <Card className="flex h-[calc(100vh-12rem)] flex-col border-gray-700 bg-gray-800 lg:col-span-3">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex justify-between items-center gap-2 text-white">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview
          </div>
          {sourceUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
            >
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3 w-3" />
                Open in new tab
              </a>
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        {demoUrl ? (
          <div className="h-full p-2">
            <div className="h-full overflow-hidden rounded-lg border border-gray-700">
              <iframe
                src={demoUrl}
                className="h-full w-full border-0"
                title="Generated Component Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-gray-500">
              <Eye className="mx-auto mb-2 h-12 w-12 opacity-50" />
              <p>No preview available for this chat</p>
              <p className="mt-1 text-xs">
                The AI may not have generated any code yet
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
