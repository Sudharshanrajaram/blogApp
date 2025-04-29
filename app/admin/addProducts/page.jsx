"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "@/Assets/assets";

function Page() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // ✅ State for preview
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup", // ✅ Set a default value
    author: "",
    authorImg: "/author_img.png",
  });

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // ✅ Set preview URL
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      if (image) formData.append("image", image);

      console.log("🚀 Sending data to API:", { ...data, image });

      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success("✅ Blog posted successfully!", { position: "top-right" });
        setImage(null);
        setImagePreview(null);
        setData({
          title: "",
          description: "",
          category: "Startup", // ✅ Reset category to default
          author: "",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error("❌ Failed to add blog", { position: "top-right" });
      }
    } catch (error) {
      toast.error("❌ Something went wrong!", { position: "top-right" });
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={onSubmitHandler}
        className="max-w-[500px] p-6 bg-white shadow-xl rounded-lg border border-gray-200"
      >
        {/* Thumbnail Upload */}
        <div className="mb-5">
          <p className="text-lg font-medium">Upload Thumbnail</p>
          <label htmlFor="image" className="cursor-pointer">
            <Image
              className="mt-4 rounded-md border shadow-sm"
              src={imagePreview || assets.upload_area} // ✅ Use preview image
              width={160}
              height={160}
              alt="upload_area"
            />
          </label>
          <input
            onChange={onImageChange}
            type="file"
            id="image"
            accept="image/*"
            required
            hidden
          />
        </div>

        {/* Blog Title */}
        <div className="mb-4">
          <p className="text-lg font-medium">Blog Title</p>
          <input
            type="text"
            name="title"
            onChange={onChangeHandler}
            value={data.title}
            required
            className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <p className="text-lg font-medium">Blog Category</p>
          <select
            name="category"
            onChange={onChangeHandler}
            value={data.category}
            className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-gray-300"
          >
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        {/* Author Name */}
        <div className="mb-4">
          <p className="text-lg font-medium">Author Name</p>
          <input
            type="text"
            name="author"
            onChange={onChangeHandler}
            value={data.author}
            required
            className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Blog Description */}
        <div className="mb-4">
          <p className="text-lg font-medium">Blog Description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            rows={5}
            required
            className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full h-12 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition duration-300"
        >
          🚀 Publish Blog
        </button>
      </form>
    </>
  );
}

export default Page;
