import Image from 'next/image'
import React, { useState } from 'react'
import { assets } from '../Assets/assets.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link.js'

function Header() {
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    
    try {
      const response = await axios.post('/api/email', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail('');
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className='py-8 px-5 md:px-12 lg:px-24 bg-gray-100 border-b-2 border-gray-300'>   
      <div className='flex justify-between items-center'>
        <Image src={assets.logo} width={180} className='w-[140px] md:w-[200px] h-10 md:h-14' alt='Website Logo' />
        <Link href={'/admin'}>
          <button className='flex items-center gap-2 font-semibold py-2 px-4 sm:py-3 sm:px-6 border border-solid border-black cursor-pointer shadow-[-5px_5px_0px_#000] bg-yellow-300 hover:bg-yellow-400 transition duration-200'>
            Get Started <Image src={assets.arrow} alt='Arrow Icon' />
          </button>
        </Link>
      </div>
      
      <div className='my-12 text-center'>
        <h1 className='text-4xl sm:text-6xl font-bold text-gray-900'>Stay Updated with Our Latest Blogs</h1>
        <p className='max-w-[740px] mx-auto mt-6 text-sm sm:text-lg text-gray-600'>
          Discover insights, trends, and expert opinions in our blog section. Stay ahead of the curve with our exclusive articles and updates. Don't miss out!
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row items-center justify-between max-w-[500px] mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000] rounded-lg overflow-hidden'>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' className='w-full px-4 py-3 outline-none text-gray-700 sm:flex-1' />
          <button type='submit' className='w-full sm:w-auto border-l border-black py-3 px-6 bg-gray-800 text-white hover:bg-gray-600 transition-all'>Subscribe</button>
        </form>

      <div className='mt-12 flex flex-col sm:flex-row justify-center items-center gap-8'>
        <div className='text-center max-w-[300px]'>
          <h3 className='text-xl font-semibold text-gray-800'>🔥 Trending Topics</h3>
          <p className='text-gray-600 mt-2'>Explore the hottest trends in technology, business, and lifestyle.</p>
        </div>
        <div className='text-center max-w-[300px]'>
          <h3 className='text-xl font-semibold text-gray-800'>📚 Expert Insights</h3>
          <p className='text-gray-600 mt-2'>Learn from industry leaders and professionals who share their knowledge.</p>
        </div>
        <div className='text-center max-w-[300px]'>
          <h3 className='text-xl font-semibold text-gray-800'>📝 Exclusive Content</h3>
          <p className='text-gray-600 mt-2'>Get access to premium articles, guides, and in-depth analysis.</p>
        </div>
      </div>
    </div>
  );
}

export default Header;