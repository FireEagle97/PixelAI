//(auth) won't be visible in the route
import LoginForm from '@/components/auth/LoginForm'
import React from 'react'
import { CardWrapper } from '@/components/shared/CardWrapper'

const Login = () => {
  return (
      <div className='w-full flex justify-center'>
        <section className='flex flex-col w-[400px]'>          
          <LoginForm />
        </section>
      </div>
  )
}

export default Login