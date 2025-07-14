"use client";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { ExternalLink, Eye, Fullscreen, X } from "lucide-react";
import { useState } from "react";

interface PreviewAreaProps {
  demoUrl?: string;
  sourceUrl?: string;
}

export function PreviewArea({ demoUrl, sourceUrl }: PreviewAreaProps) {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  return (
    <Card className="flex h-[calc(100vh-12rem)] flex-col border-gray-700 bg-gray-800 lg:col-span-3">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview
          </div>
          {(sourceUrl || demoUrl) && (
            <div className="flex items-center gap-2">
              {sourceUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="px-2 hover:bg-gray-700 hover:text-white"
                >
                  <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              )}

              {demoUrl && (
                <Dialog
                  open={isFullscreenOpen}
                  onOpenChange={setIsFullscreenOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-2 hover:bg-gray-700 hover:text-white"
                    >
                      <Fullscreen className="size-4" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="flex h-[95vh] max-h-[95vh] w-[95vw] max-w-[95vw] flex-col gap-0 border-gray-700 bg-gray-900 p-0">
                    <div className="flex max-h-1/6 items-center justify-between border-gray-700 border-b px-4 py-2">
                      <DialogTitle className="flex items-center gap-2 font-semibold text-sm text-white">
                        <Fullscreen className="size-4" />
                        Fullscreen Preview
                      </DialogTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFullscreenOpen(false)}
                        className="h-8 px-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>

                    <div className="flex-1 overflow-hidden p-4">
                      <div className="h-full overflow-hidden rounded-lg border border-gray-700">
                        <iframe
                          src={demoUrl}
                          className="h-full w-full border-0"
                          title="Generated Component Preview - Fullscreen"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
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
