import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'

function AddTransoformationTypePage({ params: {type}} : SearchParamProps) {
  const trasformation = transformationTypes[type];
  return (
    <Header 
    title={trasformation.title}
    subtitle={trasformation.subTitle}
    />
  )
}

export default AddTransoformationTypePage