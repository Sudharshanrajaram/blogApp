"use client";
import React, { useEffect, useState } from "react";
import BlogTableItem from "../../../components/AdminComponents/BlogTableItem";
import axios from "axios";
import { toast } from "react-toastify";

function Page() {
  const [blogs, setBlogs] = useState([]);

  // Fetch all blogs from the API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
    } catch (error) {
      toast.error("Failed to fetch blogs");
      console.error("Fetch Error:", error);
    }
  };

  // Delete a blog by its ID
  const deleteBlogs = async (id) => {
    try {
      const response = await axios.delete("/api/blog", {
        params: { id: id } // Use the correct id
      });
      toast.success(response.data.msg);
      fetchBlogs(); // Refresh the list after deletion
    } catch (error) {
      toast.error("Failed to delete blog");
      console.error("Delete Error:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-5 sm:px-8 lg:px-12">
      <h1 className="text-xl text-center sm:text-2xl font-semibold mb-4">All Blogs</h1>
      <div className="relative h-[80vh] max-w-full overflow-x-auto mt-5 border border-gray-400 rounded-lg shadow-md bg-white">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="hidden sm:table-cell px-4 sm:px-6 py-3">Author Name</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Blog Title</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Date</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((item) => (
                <BlogTableItem
                  key={item._id}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  authorImg={item.authorImg}
                  date={item.date}
                  deleteBlogs={() => deleteBlogs(item._id)} // Pass correct id
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No blogs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
