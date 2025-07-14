import * as React from "react";
import { cn } from "../lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

function Tooltip({ children, content, className }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "-top-8 -translate-x-1/2 absolute left-1/2 z-50 transform whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-white text-xs shadow-lg",
            className,
          )}
        >
          {content}
          <div className="-translate-x-1/2 absolute top-full left-1/2 transform border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}

export { Tooltip };
