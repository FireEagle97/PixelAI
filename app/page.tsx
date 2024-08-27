import React from 'react'
import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import RootLayout from './layout'
async function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //example of protecting home page
  const session = await getServerSession(options)
  return (
    <>
    {session ? (
      <RootLayout>{children}</RootLayout>
    ) : (
      <h1 className="text-5xl">You shall not pass!</h1> 
    )}
      </>

  )
}

export default Home