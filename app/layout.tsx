import { SettingsProvider } from "@/providers/SettingsProvider";
import { ModelsProvider } from "@/providers/ModelsProvider";
import { PdfsProvider } from "@/providers/PdfsProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "../components/common/navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ChatProvider } from "@/providers/ChatProvider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatPDF",
  description: "A new ChatPDF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <PdfsProvider>
              <ModelsProvider>
                <ChatProvider>
                  <Navbar />
                  {children}
                </ChatProvider>
              </ModelsProvider>
            </PdfsProvider>
          </SettingsProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
