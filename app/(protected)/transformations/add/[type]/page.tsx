import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { redirect } from 'next/navigation';
import { currentUser } from "@/lib/auth";

const AddTransoformationTypePage = async ({ params: { type } }: SearchParamProps) => {

  const user = await currentUser();
  if (!user?.id) redirect('/login')
  const transformation = transformationTypes[type];
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