import Image from 'next/image'
import WebHeader1 from '@/components/WebHeader1'
import WebFooter from '@/components/WebFooter'
import LoginForm from '@/components/LoginForm'
import React from 'react'

export default function Login() {
 





    return (
      <div className="w-full h-full">
        <WebHeader1 />
        <main className="w-full h-[60vh] flex justify-center items-center py-[3rem] px-3"  >
          <LoginForm />
        </main>
        <WebFooter />
      </div>
    )

 
}

