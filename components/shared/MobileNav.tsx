"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { navLinks } from '@/constants'
import { usePathname, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'


function MobileNav() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
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

    const getNavHref = (route: string) => {
        const mappedTab = tabRouteMap[route];

        if (!mappedTab) return route;

        return mappedTab === "home" ? "/dashboard" : `/dashboard?tab=${mappedTab}`;
    };
    return (
        <header className='header'>
            <Link href="/dashboard" className='flex items-center gap-2 md:py-2'>
                <Image
                    src="/assets/images/logo-text1.png"
                    alt="logo"
                    width={180}
                    height={28}
                />
            </Link>
            <nav className='flex gap-2'>
                <Sheet>
                    <SheetTrigger>
                        <Image
                            src="/assets/icons/menu.svg"
                            alt="menu"
                            width={32}
                            height={32}
                            className='cursor-pointer'
                        />
                    </SheetTrigger>
                    <SheetContent className='sheet-content sm:w-64'>
                        <>
                            <Image
                                src="/assets/images/logo-text.svg"
                                alt="logo"
                                width={152}
                                height={23}
                            />
                            <ul className='header-nav_elements'>
                                {navLinks.filter((link) => link.route !== "/credits").map((link) => {
                                    const mappedTab = tabRouteMap[link.route];
                                    const isActive = pathname === "/dashboard" && (
                                        mappedTab === "home"
                                            ? currentTab === "home"
                                            : currentTab === mappedTab
                                    );
                                    return (
                                        <li key={link.route} className={`${isActive && 'gradient-text'}
                                            p-18 flex whitespace-nowrap text-dark-700`}>
                                            <Link className='sidebar-link cursor-pointer' href={getNavHref(link.route)}>
                                                <Image
                                                    src={link.icon}
                                                    alt="logo"
                                                    width={24}
                                                    height={24}
                                                />
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </>
                    </SheetContent>
                </Sheet>
                <Button onClick={() => signOut({ callbackUrl: "/" })} className='button bg-purple-gradient bg-cover'>
                    Logout
                </Button>
            </nav>
        </header>
    )
}

export default MobileNav