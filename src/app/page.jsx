"use client"

import { useState, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link'
import DeleteBtn from './DeleteBtn';

export default function Home() {

  const [postData, setPostData] = useState([]);

  console.log(postData);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data.posts);

    } catch(error) {
      console.log("Error loading posts: ", error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto">
     <h3>NextJS Crud</h3>
     <hr className="my-3" />
     <button className="bg-green-500 p-3 text-white rounded"><Link href="/create">Create Post</Link></button>
     
     <div className="grid grid-cols-4 mt-3 gap-5">
      {postData && postData.length > 0 ? (
        postData.map(val => (
          <div key={val._id} className='shadow-xl my-10 p-10 rounded-xl'>
            <h4 className='text-2xl'>{val.title}</h4>
            <Image 
              className='my-3 rounded-md'
              src={val.img}
              width={300}
              height={0}
              alt={val.title}
            />
            <p>{val.content}</p>
            <div className='mt-5'>
              <Link className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2' href={`/edit/${val._id}`}>Edit</Link>
              <DeleteBtn id={val._id} />
            </div>
          </div>
        ))
      ) : (
        <p className='bg-gray-300 p-3 mt-3'>
          You do not have any posts yet.
        </p>
      )}
     </div>
    </main>
  );
}
