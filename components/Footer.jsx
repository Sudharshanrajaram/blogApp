import Image from 'next/image'
import React from 'react'
import { assets } from '../Assets/assets'

function Footer() {
  return (
    <div className='flex justify-around flex-colgap-2 sm:gap-0 sm:flex-grow bg-black py-5 items-center'>
        <Image src={assets.logo_light} alt='logo' width={120} className='w-[120px] md:w-[150px] lg:w-[200px]' />
        <p className='text-white text-sm'> copywrites @ blogger</p>
        <div className='flex gap-4'>
            <Image src={assets.facebook_icon} alt='facebook' width={40} />
            <Image src={assets.twitter_icon} alt='twitter' width={40} />
            <Image src={assets.googleplus_icon} alt='instagram' width={40} />
        </div>
    </div>
  )
}

export default Footer