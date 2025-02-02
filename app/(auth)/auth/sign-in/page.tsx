import SignInFormClient from '@/feature/auth/components/sign-in-form-client'
import Image from 'next/image'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-5' >
        <Image src={"/sign-up.svg"} alt="Login-Image" height={500} 
        width={500}
        className='m-6 object-cover'
        />
        <SignInFormClient/>
    </div>
  )
}

export default SignInPage