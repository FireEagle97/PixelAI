import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppChrome from "@/components/shared/AppChrome";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'

});

export const metadata: Metadata = {
  title: "CoolPixels",
  description: "AI-powered image generator app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session} refetchInterval={0} refetchOnWindowFocus={true}>
      <html lang="en">
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
          <AppChrome session={session}>{children}</AppChrome>
        </body>
      </html>
    </SessionProvider>

  );
}
