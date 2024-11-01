import { Collection } from '@/components/shared/Collection'
import Sidebar from '@/components/shared/Sidebar'
import { navLinks } from '@/constants'
import { getAllImages } from '@/lib/actions/image.actions'
import { currentUser } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';
  const user = await currentUser();
  console.log(user)
  if (!user) {
    redirect('/login');
  }
  const images = await getAllImages({ page, searchQuery, userId: user.id})
  return (

    <>
    <section className="home">
      <h1 className="home-heading">
        Unleash Your Creative Vision with Imaginify
      </h1>
      <ul className="flex-center w-full gap-20">
        {navLinks.slice(1, 5).map((link) => (
          <Link
            key={link.route}
            href={link.route}
            className="flex-center flex-col gap-2"
          >
            <li className="flex-center w-fit rounded-full bg-white p-4">
              <Image src={link.icon} alt="image" width={24} height={24} />
            </li>
            <p className="p-14-medium text-center text-white">{link.label}</p>
          </Link>
        ))}
      </ul>
    </section>

    <section className="sm:mt-12">
      <Collection 
        hasSearch={true}
        images={images?.data ?? []}
        totalPages={images?.totalPages}
        page={page}
      />
    </section>
  </>


  )
}

export default Home