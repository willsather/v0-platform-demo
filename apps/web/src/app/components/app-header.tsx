import { Sparkles } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-gray-700 border-b bg-gray-900 px-4 py-3">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Sparkles className="h-5 w-5 text-blue-400" />
          <h1 className="font-bold text-white text-lg">v0 Platform Demo</h1>
        </Link>
      </div>
    </header>
  );
} 