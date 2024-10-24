import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
// import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getUserById } from '@/data/user';
import { auth } from '@/auth';
import { currentUser } from "@/lib/auth";

const AddTransoformationTypePage = async ({ params: { type } }: SearchParamProps) => {

  const user = await currentUser();
  if (!user?.id) redirect('/login')
  const transformation = transformationTypes[type];
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect(`/api/auth/signin?callbackUrl=/transformations/add/{transformation.type}`)
  //   }
  // })

  // if(!userId) redirect('/sign-in');

  // const user = await getUserById(userId);
  return (
    <>
      <Header
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
      <section className='mt-10'>
        <TransformationForm action="Add" userId={user.id} type={transformation.type as TransformationTypeKey} creditBalance={user.creditBalance} />
      </section>

    </>

  )
}

export default AddTransoformationTypePage