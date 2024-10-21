import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Sidebar';
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ToastSonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";


const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'

});

export const metadata: Metadata = {
  title: "PixelAI",
  description: "AI-powered image generator app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
          <header>
          </header>
          <main className="root">
            <Sidebar />
            <MobileNav />
            <div className='root-container'>
              <div className='wrapper'>
                <ToastSonner/>
                <Toaster/>
                {children}
              </div>
            </div>
          </main>
        </body>
      </html>
    </SessionProvider>

  );
}
