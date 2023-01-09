import {React, useState, useEffect} from 'react'
import {getProviders, getSession, useSession} from 'next-auth/react'
import {useRecoilState} from "recoil"
import {profileModalState, postIdState} from '../atoms/modalAtom'

import {
    onSnapshot,
    query,
    doc,
    addDoc,
    orderBy,
    setDoc,
    collection,
    serverTimestamp,
  } from "@firebase/firestore";
import { db } from "../firebase";

import Moment from "react-moment";


function ProfileHeader({sessionID, userId}) {

    // const {memberId} = member
    console.log('userId:',userId)

    const {data: session} = useSession();
    const [isProfileOpen, isSetProfileOpen]=useRecoilState(profileModalState);
    const [user, setUser] = useState();

    const [followingSession, setFollowingSession]=useState([])
    const [followedSession, setFollowedSession]=useState([])

    const [followingMember, setFollowingMember]=useState([])
    const [followedMember, setFollowedMember]=useState([])



// user profile update
useEffect(()=>{
    try {
        if(sessionID===userId){

            onSnapshot(doc(db,"users",sessionID), (snapshot)=>{
                setUser(snapshot.data());
               })
         } else {
           //  const id = session.user.uid
             onSnapshot(doc(db,"users",userId), (snapshot)=>{
                 setUser(snapshot.data());
               })
         }
    } catch(error) {
        console.error(error)
    }
},[db, userId])
// session following and followeed
useEffect(
    ()=>
    onSnapshot(
        query(
            collection(db,"users",sessionID,"following"),
            orderBy("timestamp","desc")
           ), 
        (snapshot)=>setFollowingSession(snapshot.docs)
    ),
  [db,sessionID]
);
useEffect(
    ()=>
    onSnapshot(
        query(
            collection(db,"users",sessionID,"followed"),
            orderBy("timestamp","desc")
           ), 
        (snapshot)=>setFollowedSession(snapshot.docs)
    ),
  [db,sessionID]
);
// member following and followeed
useEffect(
    ()=>{
    try {
    onSnapshot(
        query(
            collection(db,"users",userId,"following"),
            orderBy("timestamp","desc")
           ), 
        (snapshot)=>setFollowingMember(snapshot.docs)
    ),
   [db,userId]
    } catch(error) 
    {
        console.error(error)
    }
    }
);
useEffect(
    ()=>{
        try {
            onSnapshot(
                query(
                    collection(db,"users",userId,"followed"),
                    orderBy("timestamp","desc")
                   ), 
                (snapshot)=>setFollowedMember(snapshot.docs)
            ),
          [db,userId]
        } catch(error) 
        {
            console.error(error)
        }
    }
);
// add follower
const followMember =async(e)=>{
    e.preventDefault();

   await setDoc(doc(db,'users',sessionID, 'following', userId),{
    id:session.user.uid,
    username:userId,
    userImg:session.user.image,
    timestamp:serverTimestamp(),
    })

    await setDoc(doc(db,'users', userId, 'followed', sessionID),{
    id:userId,
    username:session.user.uid,
    userImg:session.user.image,
    timestamp:serverTimestamp(),
    })
}



  return (
    <div>
         {/* Header part */}    
    <div className='bg-[#131313]'>
        <div className="w-full bg-cover bg-no-repeat bg-center h-100 " >
            <img className="opacity-0 w-full h-full" src="https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x100" alt=""/>
        </div>
        <div className="p-4">
            <div className="relative flex w-full">
                
                <div className="flex flex-1">
                    <div className="mt-(-10)">
                        <div className="md rounded-full relative avatar h-[120px] w-[120px]">
                            <img  className="md rounded-full relative border-4 h-[120px] w-[120px] border-white-900"  src={user?.userImg}  alt=""/>
                           
                            <div className="absolute"></div>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col text-right">
                 {sessionID===userId ? (
                    <button 
                    className="flex justify-center  max-h-max whitespace-nowrap 
                    focus:outline-none  focus:ring rounded-full max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 
                     hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto"
                     onClick={(e) => {
                       e.stopPropagation();
                       console.log('click profile')
                       isSetProfileOpen(true);
                       console.log(isProfileOpen)
                      }}
                     >
                     Edit Profile
                    </button>
                 ):(
                  <button 
                    className="flex justify-center  max-h-max whitespace-nowrap 
                    focus:outline-none  focus:ring rounded-full max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 
                     hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto"
                     onClick={followMember}
                     >
                 Follow
                    </button>
                 )}
                 
                    
                </div>
            </div>

            
            <div className="space-y-1 justify-center w-full mt-3 ml-3">
                
                <div>
                    <h2 className="text-xl leading-6 font-bold text-white">{user?.username}</h2>
                    <p className="text-sm leading-5 font-medium text-gray-600">@{user?.tag}</p>
                </div>
                
                <div className="mt-3">
                    <p className="text-white leading-tight mb-2">
                        {user?.occupation}
                        <br/>{user?.description}
                    </p>
                    <div className="text-gray-600 flex">
                        <span className="flex mr-2"><svg viewBox="0 0 24 24" className="h-5 w-5 paint-icon"><g><path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path></g></svg> 
                        <a href="https://ricardoribeirodev.com/personal/" target="#" class="leading-5 ml-1 text-blue-400">
                            www.raisondetre.tokyo
                            </a>
                        </span>
                        <span className="flex mr-2"><svg viewBox="0 0 24 24" className="h-5 w-5 paint-icon"><g><path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path><circle cx="7.032" cy="8.75" r="1.285"></circle><circle cx="7.032" cy="13.156" r="1.285"></circle><circle cx="16.968" cy="8.75" r="1.285"></circle><circle cx="16.968" cy="13.156" r="1.285"></circle><circle cx="12" cy="8.75" r="1.285"></circle><circle cx="12" cy="13.156" r="1.285"></circle><circle cx="7.032" cy="17.486" r="1.285"></circle><circle cx="12" cy="17.486" r="1.285"></circle></g></svg> 
                        <span class="leading-5 ml-1">
                        Joined <Moment fromNow>{user?.timestamp?.toDate()}</Moment>
                        </span>
                        </span>
                    </div>
                </div>
               
                {userId===sessionID ? (
                <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                    <div className="text-center pr-4">
                        <span className="font-bold text-white">
                            {followingSession.length}
                        </span>
                        <span className="text-gray-500">  following</span>
                    </div>
                     <div className="text-center px-4">
                        <span className="font-bold text-white">
                            {followedSession.length}
                        </span>
                        <span className="text-gray-500">  followers</span>
                    </div>
                </div>
                ):(
                <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                    <div className="text-center pr-4">
                        <span className="font-bold text-white">
                            {followingMember.length}
                        </span>
                        <span className="text-gray-500">  following</span>
                    </div>
                     <div className="text-center px-4">
                        <span className="font-bold text-white">
                            {followedMember.length}
                        </span>
                        <span className="text-gray-500">  followers</span>
                    </div>
                </div>
                )}
               
               
               
                
            </div>
        </div>
        <hr className="border-gray-800"/>
    </div>
  
    </div>


  )
}

export default ProfileHeader
