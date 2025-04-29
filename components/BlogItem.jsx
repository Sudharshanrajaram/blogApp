import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BlogItem({ title, description, category, image, id }) {
  return (
    <div className='max-w-[340px] sm:max-w-[320px] bg-white border border-black rounded-lg overflow-hidden shadow-lg hover:shadow-[-7px_7px_0px_#000] transition-shadow duration-300'>
      <Link href={`/blogs/${id}`}>
        <Image src={image} width={400} height={250} alt='' className='border-b border-black object-cover w-full h-[200px]' />
      </Link>
      <div className='p-5'>
        <p className='inline-block bg-black text-white text-xs px-3 py-1 rounded-full mb-3'>{category}</p>
        <h5 className='mb-2 text-lg font-semibold text-gray-900'>{title}</h5>
        <p className='mb-3 text-sm text-gray-700 leading-relaxed line-clamp-3'>
          {description.length > 120 ? description.slice(0, 120) + '...' : description}
        </p>
        <Link href={`/blogs/${id}`}>
          <div className='inline-flex items-center font-semibold text-black hover:text-gray-700 transition-colors'>
            Read More
            <Image src={assets.arrow} alt='arrow' width={12} className='ml-2' />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BlogItem;