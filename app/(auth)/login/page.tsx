//(auth) won't be visible in the route
import LoginForm from '@/components/auth/LoginForm'
import LoginGithub from '@/components/auth/LoginGithub'
import React from 'react'
import { CardWrapper } from '@/components/shared/CardWrapper'

const Login = () => {
  return (
    <CardWrapper
      headerTitle='Login'
      backButtonHref='/register'
      backButtonLabel="Don't have an account?"
      showSocial
    >
      <div className='w-full flex justify-center'>
        <section className='flex flex-col w-[400px]'>
          {/* <h1 className='text-3xl w-full text-center font-bold mb-6'>Sign in</h1> */}
          <LoginForm />
          {/* <LoginGithub /> */}
        </section>
      </div>
    </CardWrapper>

  )
}

export default Login