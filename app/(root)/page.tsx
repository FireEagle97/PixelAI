import React from 'react'
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
async function Home() {
  //example of protecting home page
  const session = await getServerSession(options)
  return (
    /*
    <>
    {session ? (
      <UserCard user={session?.user} pagetype={"Home"}/>
    ) : (
      <h1 className="text-5xl">You shall not pass!></h1> 
    )}
      </>
      */
    <div>
    </div>
  )
}

export default Home