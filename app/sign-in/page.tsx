import LoginGithub from '@/components/shared/LoginGithub'
import React from 'react'

const  SignIn = () => {
  return (
    <div className='w-full flex mt-20 justify-center'>
        <section className='flex flex-col w-[400px]'>
            <h1 className='text-3xl w-full text-center font-bold mb-6'>Sign in</h1>
            {/* TODO login form */}
            <LoginGithub/>
        </section>
    </div>
  )
}

export default SignIn