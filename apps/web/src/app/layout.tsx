import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppHeader } from "./components/app-header";
import { ChatSidebar } from "./components/chat-sidebar";

import "@repo/ui/styles/tailwind.css";

export const metadata: Metadata = {
  title: "v0 Platform Demo",
  description: "Generate beautiful UI components using AI. Powered by V0 SDK.",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} bg-gray-900`}>
        <div className="flex flex-col">
          <AppHeader />
          <div className="flex">
            <ChatSidebar />
            {children}
          </div>
        </div>

        <Analytics />
        <SpeedInsights />
        {process.env.NODE_ENV === "development" && <VercelToolbar />}
      </body>
    </html>
  );
}
