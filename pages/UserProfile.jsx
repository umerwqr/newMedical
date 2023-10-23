import WebFooter from '@/components/WebFooter'
import WebHeader from '@/components/WebHeader'
import ProfileForm from '@/components/ProfileForm'
import React from 'react'

function UserProfile() {
  return (
    <div>
        <WebHeader/>
        <main className="w-full h-full flex justify-center items-center py-[4rem] ">
            <ProfileForm/>
        </main>
        <WebFooter/>
    </div>
  )
}

export default UserProfile