"use client";

import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { ToastSonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

type AppChromeProps = {
  children: React.ReactNode;
  session: Session | null;
};

export const AppChrome = ({ children, session }: AppChromeProps) => {
  const pathname = usePathname();
  const showDashboardNav = Boolean(session) && pathname === "/dashboard";
  const isLandingPage = pathname === "/";

  return (
    <main className={showDashboardNav ? "root" : "min-h-screen w-full bg-white"}>
      {showDashboardNav && <Sidebar serverSession={session} />}
      {showDashboardNav && <MobileNav />}
      <div className={isLandingPage ? "w-full" : "root-container"}>
        <div className={isLandingPage ? "w-full" : "wrapper"}>
          <ToastSonner />
          <Toaster />
          {children}
        </div>
      </div>
    </main>
  );
};

export default AppChrome;
