import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@/app/globals.css";
import Sidebar from "@/components/sidebar/Sidebar";

import { ChatProvider } from "@/contexts/chat-context";
import PromptInput from "@/components/chat/PromptInput";
import ChatArea from "@/components/chat/ChatArea";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "byok.chat - Bring Your Own Key Chat",
  description: "Chat with multiple AI models using your own API keys",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // TODO : implement sidebar toggle

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen w-full">
          <Sidebar />
          <main className="flex-1 h-full overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
