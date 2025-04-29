import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

function BlogList() {
    const [menu, setMenu] = useState('All');
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blog');
            setBlogs(response.data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => { 
        fetchBlogs();
    }, []);

    return (
        <div className='px-4 sm:px-8 md:px-12 lg:px-24'>
            <div className='text-center my-6 sm:my-10'>
                <h2 className='text-2xl sm:text-3xl font-semibold'>Explore Our Blog</h2>
                <p className='max-w-[700px] mx-auto mt-2 sm:mt-4 text-sm sm:text-base text-gray-600'>
                    Discover insightful articles on Technology, Startups, and Lifestyle. Stay informed and inspired!
                </p>
            </div>

            <div className='flex flex-wrap justify-center gap-3 sm:gap-4 my-6 sm:my-8'>
                {['All', 'Technology', 'Startup', 'Lifestyle'].map((category) => (
                    <button 
                        key={category} 
                        onClick={() => setMenu(category)}
                        className={`py-2 px-4 sm:px-6 rounded-full border text-sm sm:text-base ${menu === category ? 'bg-black text-white' : 'border-gray-400 text-gray-700 hover:bg-gray-200'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className='flex flex-wrap justify-center sm:justify-around gap-4 gap-y-6 sm:gap-y-10 mb-12 sm:mb-16 xl:mb-24'>
                {blogs.filter((item) => menu === "All" ? true : item.category === menu).length > 0 ? (
                    blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => (
                        <BlogItem 
                            key={index} 
                            id={item._id} 
                            image={item.image} 
                            title={item.title} 
                            description={item.description} 
                            category={item.category} 
                        />
                    ))
                ) : (
                    <p className='text-gray-500 text-center w-full text-sm sm:text-base'>No blogs available in this category.</p>
                )}
            </div>
        </div>
    );
}

export default BlogList;
