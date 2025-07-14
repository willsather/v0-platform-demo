import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ChatSidebar } from "./components/chat-sidebar";

import "@repo/ui/styles/tailwind.css";

export const metadata: Metadata = {
  title: "AI UI Generator",
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
      <body className={GeistSans.className}>
        <div className="flex min-h-screen">
          <ChatSidebar />
          <main className="flex-1">{children}</main>
        </div>

        <Analytics />
        <SpeedInsights />
        {process.env.NODE_ENV === "development" && <VercelToolbar />}
      </body>
    </html>
  );
}
