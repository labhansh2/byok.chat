import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "@/app/globals.css";
import Sidebar from "@/components/sidebar/Sidebar";

import { ChatProvider } from "@/contexts/chat-context";

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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex h-screen w-full">
            <ChatProvider>
              <Sidebar />
              <main className="flex-1 h-full overflow-hidden">{children}</main>
            </ChatProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
