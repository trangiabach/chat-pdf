

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
