import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';

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
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        elements: {
          // Modal styling
          modalContent: "bg-[#0a0a0a] border border-[#27272a]",
          modalCloseButton: "text-[#a1a1aa] hover:text-[#fafafa]",
          
          // Card styling
          card: "bg-[#0a0a0a] border border-[#27272a] shadow-2xl",
          
          // Header styling
          headerTitle: "text-[#fafafa]",
          headerSubtitle: "text-[#a1a1aa]",
          
          // Social buttons
          socialButtonsBlockButton: "bg-[#27272a] border border-[#27272a] text-[#fafafa] hover:bg-[#27272a]/80 transition-colors",
          socialButtonsBlockButtonText: "text-[#fafafa] font-medium",
          
          // Dividers
          dividerLine: "bg-[#27272a]",
          dividerText: "text-[#a1a1aa]",
          
          // Form elements
          formButtonPrimary: "bg-[#fafafa] text-[#18181b] hover:bg-[#fafafa]/90 transition-colors font-medium",
          formFieldInput: "bg-[#18181b] border border-[#27272a] text-[#fafafa] focus:ring-2 focus:ring-[#fafafa] focus:border-transparent",
          formFieldLabel: "text-[#fafafa] font-medium",
          
          // Footer
          footerActionText: "text-[#a1a1aa]",
          footerActionLink: "text-[#fafafa] hover:text-[#fafafa]/80",
          
          // Error states
          formFieldErrorText: "text-red-400",
          alert: "bg-red-500/10 border border-red-500/20 text-red-400",
          alertText: "text-red-400",
          
          // Identity preview
          identityPreviewText: "text-[#fafafa]",
          identityPreviewEditButton: "text-[#fafafa] hover:text-[#fafafa]/80",
        }
      }}
    >
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
