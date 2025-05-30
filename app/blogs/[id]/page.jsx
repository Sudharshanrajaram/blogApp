"use client";
import { useEffect, useState } from "react";
import { assets } from "@/Assets/assets";
import { useParams } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "axios";

function page({}) {
  const params = useParams();
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: {
        id: params.id,
      },
    });
    setData(response.data.blog);
    console.log(response.data.blog);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
       
          <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={assets.logo}
              width={180}
              className="w-[130px] sm:w-auto"
              alt="logo"
            />
            </Link>
            <Link href={"/admin/blogList"}>
            <button className="flex items-center font-medium gap-2 py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000]">
              To Blog
              <Image src={assets.arrow} alt="" />
            </button>
            </Link>
          </div>
        <div className="text-center my-24 ">
          <h1 className="text-2xl sm:text-5xl font-semibold mx-auto max-w-[700px]">
            {data.title}
          </h1>
          <Image
            src={data.authorImg}
            width={60}
            height={60}
            className="mx-auto mt-6 border border-white rounded-full "
            alt="logo"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto  ">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image}
          alt="blog_img"
          width={1280}
          height={720}
          className="border-4 border-white"
        />
        <div className="blog-content" dangerouslySetInnerHTML={{__html: data.description}} >

        </div>
        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this articels on social media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} alt="facebook" width={50} />
            <Image src={assets.twitter_icon} alt="facebook" width={50} />
            <Image src={assets.googleplus_icon} alt="facebook" width={50} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
}

export default page;
