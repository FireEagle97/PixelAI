import React from 'react'
import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Sidebar';
// import { options } from "./api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
import RootLayout from './layout'
async function Home() {
  //example of protecting home page
  // const session = await getServerSession(options)
  return (

    <div>
      <h1 className="text-3xl font-bold">Welcome to the Homepage!</h1>
      <p>This is the main content of the homepage.</p>
    </div>


  )
}

export default Home