"use client";
import Image from "next/image";
import { useState } from "react";
import { assets } from "../../Assets/assets.js";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col bg-slate-190">
      {/* Top Bar */}
      <div className="px-2 py-3 md:border md:border-black  bg-white md:shadow-md">
        {/* Logo */}
        {isOpen ? (
          ""
        ) : (
          <Link href={"/"}>
            <Image
              src={assets.logo}
              width={120}
              alt="logo"
              className="hidden md:block "
            />
          </Link>
        )}
        <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} className=" ml-2" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-black transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:relative sm:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="w-full h-full py-12 px-6">
          <button
            className="absolute top-4 right-4 sm:hidden"
            onClick={() => setIsOpen(false)}
          >
            <AiOutlineClose size={24} />
          </button>
          {isOpen ? (
            <Link href={"/"}>
              <Image
                src={assets.logo}
                width={120}
                alt="logo"
                className="md:hidden "
              />
            </Link>
          ) : (
            ""
          )}
          <Link href={"/admin/addProducts"}>
            <div className="flex items-center mt-6 border border-black gap-3 font-medium px-3 py-2 bg-white shadow-md hover:bg-gray-100 cursor-pointer">
              <Image src={assets.add_icon} width={28} alt="profile" />
              <p>Add Blogs</p>
            </div>
          </Link>
          <Link href={"/admin/blogList"}>
            <div className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-md hover:bg-gray-100 cursor-pointer">
              <Image src={assets.blog_icon} width={28} alt="profile" />
              <p>Blogs List</p>
            </div>
          </Link>
          <Link href={"/admin/subscription"}>
            <div className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-md hover:bg-gray-100 cursor-pointer">
              <Image src={assets.email_icon} width={28} alt="profile" />
              <p>Subscription</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
