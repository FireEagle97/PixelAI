import { SignUp } from '@clerk/nextjs'
import React from 'react'

function SignUpPage() {
  return (
    <SignUp afterSignOutUrl="/"/>
  )
}

export default SignUpPage