import { auth } from '@/auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

const ProfilePage = async() => {
  const session = await auth();
  return (
    <div>Profile Page
      <div className='flex items-center gap-x-5'>
          <div className='flex items-center gap-x-2 text-sm'>
            {session?.user?.name}
            {session?.user?.image && (
             <Image
              className="rounded-full"
              width={30}
              height={30}
              alt="User Avatar"
              src={session?.user?.image || ""}
             />
            )}
          </div>
      </div>
    </div>
  )

}

export default ProfilePage