import {React, useEffect, useState} from 'react'
import {SparklesIcon} from "@heroicons/react/24/outline"
import {useSession} from "next-auth/react"
import Input from '../components/Input'
import Post from '../components/Post'

import {db} from "../firebase"
import {onSnapshot, collection, query, orderBy} from '@firebase/firestore'


function Feed() {
const [posts, setPosts]=useState([])


useEffect(
  ()=>
  onSnapshot(
    query(collection(db, "posts"), orderBy("timestamp", "desc")),
    (snapshot)=>{
      setPosts(snapshot.docs)
    }
  ),[db])


  console.log(posts)


  return (
    <div className="text-[#a4344e] flex-grow border-l border-r 
    border-gray-800 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
     <div className="text-[#a4344e] flex items-center 
     sm:justify-between py-2 px-3 sticky top-0 z-50 bg-[#131313]
     border-b border-gray-800">
       <h2 className="text-lg sm:text-xl font-bold">Home</h2>
       <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">

        <SparklesIcon className="h-5 text-[#a4344e]"/>
       </div>
     </div>

     <Input/>

     <div className="pb-72">
       {posts.map(post=>(
        <Post key={post.id} id={post.id} post={post.data()}/>
       ))

       }
     </div>

    </div>
  )
}

export default Feed
