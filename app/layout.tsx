import { SettingsProvider } from "@/providers/SettingsProvider";
import { ModelsProvider } from "@/providers/ModelsProvider";
import { PdfsProvider } from "@/providers/PdfsProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "../components/common/navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ChatProvider } from "@/providers/ChatProvider";
import { Analytics } from "@vercel/analytics/react";
import { getAllFilesWithinBucket } from "@/db/storage/helpers";
import { Pdf } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatPDF",
  description: "A new ChatPDF",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pdfs = await getAllFilesWithinBucket();

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
            <PdfsProvider initialPdfs={pdfs}>
              <ModelsProvider>
                <ChatProvider>
                  <Navbar />
                  {children}
                </ChatProvider>
              </ModelsProvider>
            </PdfsProvider>
          </SettingsProvider>
        </ThemeProvider>
        <Toaster position="bottom-left" />
        <Analytics />
      </body>
    </html>
  );
}
