"use client"
import { navLinks } from '@/constants'
import { signOut } from "next-auth/react"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { useCurrentUser } from '@/hooks/use-current-session'
import { Button } from '../ui/button'
  
export  const Sidebar = ( {serverSession} : SidebarProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentUser = useCurrentUser();
    const currentTab = searchParams.get("tab") ?? "home";
    const tabRouteMap: Record<string, string> = {
      "/dashboard": "home",
      "/transformations/add/restore": "restore",
      "/transformations/add/fill": "fill",
      "/transformations/add/remove": "remove",
      "/transformations/add/recolor": "recolor",
      "/transformations/add/removeBackground": "removeBackground",
      "/profile": "profile",
    };

    const getSidebarHref = (route: string) => {
      const mappedTab = tabRouteMap[route];

      if (!mappedTab) return route;

      return mappedTab === "home" ? "/dashboard" : `/dashboard?tab=${mappedTab}`;
    };
    return (
        <aside className='sidebar'>
            <div className='flex size-full flex-col gap-4'>
                <Link href="/dashboard" className='sidebar-logo'>
                    <Image src="/assets/images/logo-text1.png" alt="logo" width={180} height={28} />
                </Link>
                <nav className='sidebar-nav'>
                    {serverSession  && (
                        <>
                            <ul className='sidebar-nav_elements'>
                                {navLinks.slice(0, 6).map((link) => {
                                    const mappedTab = tabRouteMap[link.route];
                                    const isActive = pathname === "/dashboard" && (
                                      mappedTab === "home"
                                        ? currentTab === "home"
                                        : currentTab === mappedTab
                                    );
                                    return (
                                        <li key={link.route} className={`sidebar-nav_element group
                        ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                                            <Link className='sidebar-link' href={getSidebarHref(link.route)}>
                                                <Image
                                                    src={link.icon}
                                                    alt="logo"
                                                    width={24}
                                                    height={24}
                                                    className={`${isActive && 'brightness-200'}`}
                                                />
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                            <ul className='sidebar-nav_elements'>
                                {navLinks.slice(6).filter((link) => link.route !== "/credits").map((link) => {
                                    const mappedTab = tabRouteMap[link.route];
                                    const isActive = pathname === "/dashboard" && currentTab === mappedTab;
                                    return (
                                        <li key={link.route} className={`sidebar-nav_element group
                        ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                                            <Link className='sidebar-link' href={getSidebarHref(link.route)}>
                                                <Image
                                                    src={link.label == "Profile" ? currentUser?.image ?? link.icon : link.icon}
                                                    alt="logo"
                                                    width={24}
                                                    height={24}
                                                    className={`${isActive && 'brightness-200'} rounded-full`}
                                                />
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                                <li className='flex-center cursor-pointer gap-2 p-4'>
                                    <Button onClick={() => signOut({ callbackUrl: "/" })} className='button bg-purple-gradient bg-cover text-white'>
                                        Logout
                                    </Button>
                                </li>
                            </ul>
                        </>
                    // ) : (
                    //     <LoginButton asChild mode="redirect">
                    //         <Button  className='button bg-purple-gradient bg-cover'>
                    //             Login
                    //         </Button>
                    //     </LoginButton>
                       
                    // )
                    )}
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar