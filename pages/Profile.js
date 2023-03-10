import {React, useEffect, useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar'

import Feed from '../components/Feed'
import Login from '../components/Login'
import Modal from '../components/Modal'
import TweetModal from '../components/TweetModal'
import ProfileModel from '../components/ProfileModal'
import {SparklesIcon} from "@heroicons/react/24/outline"
import {getProviders, getSession, useSession} from 'next-auth/react'
import { useRecoilState } from "recoil";
import { modalState, tweetModalState, profileModalState, memberIdState } from "../atoms/modalAtom";
import Input from '../components/Input'
import Post from '../components/Post'
import Widgets from '../components/Widgets'

import {db} from "../firebase"
import {onSnapshot, collection, query, orderBy, where} from '@firebase/firestore'
import ProfileHeader from '../components/ProfileHeader'
import {useRouter} from "next/router"



export default function Profile({ providers}) {
const {data: session} = useSession();
const [isOpen, setIsOpen] = useRecoilState(modalState);
const [isProfileOpen, setIsPofileOpen] = useRecoilState(profileModalState);

const [isOpenSideModal, setIsOpenSideModal]=useRecoilState(tweetModalState)

const [posts, setPosts]=useState([])

if(!session) return <Login providers={providers}/>

// query param 
const router = useRouter();
console.log('profile query',router.query)
const {id} = router.query;




const uid = session.user.uid
console.log('sessionid:', uid)




// more clean version 
useEffect(
    ()=>
    onSnapshot(
      query(collection(db, "posts"),
      orderBy("timestamp", "desc")),
      (snapshot)=>{
        setPosts(snapshot.docs)
      }
    ),[db])

    
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Victim</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
      
        <Sidebar/>
       
        <div className="text-white flex-grow border-1 border-r
        border-l border-gray-800 max-w-2xl sm:ml-[73px] xl:ml-[370px]" >

        {/* top bar  */}
        <div className="text-[#9d9d9d] flex items-center sm:justify-between
        py-2 px-3 sticky top-0 z-50 bg-[#131313] border-b border-gray-800">
            <h2 className="text-lg sm:text-xl font-bold">Your Profile</h2> 
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
            <SparklesIcon className="h-5 text-white"/>
            </div>
        </div>
            
            
        {/* Header part */}    
         <ProfileHeader sessionID={uid} userId={id}/>
        {/* <ProfileHeader memberId={id}/> */}

          {/* Input  */}
            <Input/>
            
            <div className="pb-72">
                {posts.map(post=>(
                    <Post key={post.id} id={post.id} post={post.data()}/>
                ))
                }
           </div>
        </div>

        <Widgets/>

       {/* modal is for tweet on tweet */}
        {isOpen && <Modal/>}   
      {/* profile update */}
        {isProfileOpen && <ProfileModel/>}
      {/* simple tweet */}
        {isOpenSideModal && <TweetModal/>}

       

      </main>

    </div>
  );
}

 export async function getServerSideProps(context){
  //  const trendingResults = await fetch(`https://jsonkeeper.com/b/NKEV`).then(
  //    (res)=>res.json()
  //  );
  //  const followResults = await fetch(`https://jsonkeeper.com/b/WWMJ`).then(
  //    (res)=>res.json()
  //  );
   const providers=await getProviders();
   const session = await getSession(context)

   return {
     props:{
     //  trendingResults,
     //  followResults,
       providers,
       session,
     },
   };
 }