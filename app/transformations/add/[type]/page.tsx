import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AddTransoformationTypePage = async({ params: {type}} : SearchParamProps) => {
  // const { userId } = auth();
  const transformation = transformationTypes[type];
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/api/auth/signin?callbackUrl=/transformations/add/{transformation.type}`)
    }
  })

  // if(!userId) redirect('/sign-in');
  
  // const user = await getUserById(userId);
  return (
    <>
    <Header 
    title={transformation.title}
    subtitle={transformation.subTitle}
    />
    {/* <TransformationForm action="Add" userId={user._id} type={transformation.type as TransformationTypeKey} creditBalance={user.creditBalance}/> */}
    <TransformationForm action="Add" userId="1" type={transformation.type as TransformationTypeKey} creditBalance={0} />
    </>
    
  )
}

export default AddTransoformationTypePage