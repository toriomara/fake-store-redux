import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/components/StoreProvider";
import { PersistProvider } from "@/components/PersistProvider";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fake Store - your best choice",
  description: "Shop online everywhere everytime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen w-full`}
      >
        <StoreProvider>
          <PersistProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
            </ThemeProvider>
          </PersistProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

//     LOGIN
//     username: johnd
//     password: m38rmF$
