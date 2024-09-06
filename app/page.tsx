import React from 'react'
// import { options } from "./api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
import RootLayout from './layout'
async function Home(){
  //example of protecting home page
  // const session = await getServerSession(options)
  return (
    <div>
    <h1 className="text-3xl font-bold">Welcome to the Homepage!</h1>
    <p>This is the main content of the homepage.</p>
  </div>
    // <>
    // {session ? (
    //   <RootLayout>{children}</RootLayout>
    // ) : (
    //   <h1 className="text-5xl">You shall not pass!</h1> 
    // )}
    //   </>

  )
}

export default Home