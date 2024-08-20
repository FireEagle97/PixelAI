import { SignIn } from '@clerk/nextjs'
import React from 'react'

function SignInPage() {
  return (
    <SignIn afterSignOutUrl="/"/>
  )
}

export default SignInPage