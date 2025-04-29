import Image from 'next/image'
import { assets } from '@/Assets/assets.js'

function BlogTableItem({ authorImg, title, author, date, deleteBlogs, mongoId }) {
  const BlogDate = date ? new Date(date) : null;

  return (
    <tr className='bg-white border-b'>
      <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        <Image 
          src={authorImg?.trim() ? authorImg : assets.profile_icon} 
          width={40} 
          height={40} 
          className='rounded-full' 
          alt='Author Image' 
        />
        <p>{author ? author : "No Author"}</p>
      </th>
      <td className='px-6 py-4'>
        {title ? title : "No title"}
      </td>
      <td className='px-6 py-4'>
        {BlogDate ? BlogDate.toDateString() : "No Date"}
      </td>
      <td 
        onClick={() => {
          if (mongoId) deleteBlogs(mongoId);
        }} 
        className='px-6 py-4 cursor-pointer text-red-500 hover:text-red-700'
      >
        x
      </td>
    </tr>
  )
}

export default BlogTableItem;
