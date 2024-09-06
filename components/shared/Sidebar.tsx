"use client"
import { navLinks } from '@/constants'
// import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import Logout from './Logout'

function Sidebar() {
    const pathname = usePathname();
    const { data: session, status } = useSession()
    return (
        <aside className='sidebar'>
            <div className='flex size-full flex-col gap-4'>
                <Link href="/" className='sidebar-logo'>
                    <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
                </Link>
                <nav className='sidebar-nav'>
                    {status === 'authenticated' ? (
                        <>
                            <ul className='sidebar-nav_elements'>
                                {navLinks.slice(0, 6).map((link) => {
                                    const isActive = link.route === pathname
                                    return (
                                        <li key={link.route} className={`sidebar-nav_element group
                        ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                                            <Link className='sidebar-link' href={link.route}>
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
                                {navLinks.slice(6).map((link) => {
                                    const isActive = link.route === pathname
                                    return (
                                        <li key={link.route} className={`sidebar-nav_element group
                        ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                                            <Link className='sidebar-link' href={link.route}>
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
                                <>
                                    <Logout/>
                                </>
                                {/* <li className='flex-center cursor-pointer gap-2 p-4'>
                                    <button onClick={() => signOut()} className='button bg-purple-gradient bg-cover text-white'>
                                        Logout
                                    </button>
                                </li> */}
                            </ul>
                        </>
                    ) : (
                        <Button asChild className='button bg-purple-gradient bg-cover'>
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    )}
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar