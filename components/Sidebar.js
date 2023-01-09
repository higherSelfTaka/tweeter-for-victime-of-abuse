import React from 'react'
import Image from 'next/image'
import SidebarLink from './SidebarLink'
import {HomeIcon} from "@heroicons/react/24/solid"
import {
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    BeakerIcon,
    UserIcon,
    DotsCircleHorizontalIcon,
    ArrowDownCircleIcon,
  } from '@heroicons/react/24/outline'
import {useSession, signOut} from "next-auth/react"
import {useRecoilState} from "recoil"
import {tweetModalState} from '../atoms/modalAtom'


function Sidebar() {
  const {data: session} = useSession()
  const [isTweetModalOpen, setIsTweetModalOpen]=useRecoilState(tweetModalState)


  return (
    <div className="hidden sm:flex flex-col items-center 
    xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 w-14 hoverAnimation p-0
      xl:ml-24">
        <Image 
        src="/logo.png" 
        width={50} 
        height={50}/> 
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
     
        <SidebarLink text="Home" pathname="/" id="" Icon={HomeIcon} active/>
        {/* <SidebarLink text="Explore" pathname="" Icon={HashtagIcon} /> */}
        <SidebarLink text="Online Event" pathname="" id="" Icon={BellIcon} /> 
        <SidebarLink text="Message" pathname="/Message" id="" Icon={InboxIcon} />
        <SidebarLink text="Supporters" pathname="" id="" Icon={BookmarkIcon} /> 
        {/* <SidebarLink text="Lists" pathname="" Icon={BeakerIcon} /> */}
        <SidebarLink text="Profile" pathname="/Profile" id={session.user.uid} Icon={UserIcon}/>
        {/* <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />  */}
      </div>


      <button className="hidden xl:inline ml-auto bg-[#1d9bf0]
       text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md
       hover:bg-[#1a8cd8]"
       onDoubleClick={(e)=>{
        e.stopPropagation();
        setIsTweetModalOpen(true);
        console.log(isTweetModalOpen)
       }}
       
       >
        Tweet
      </button>

      <div className="text-[#d9d9d9] flex items-center justify-center hoverAnimation 
      xl:ml-auto xl:-mr-5 mt-auto" onClick={signOut}>
            <img src={session.user.image} alt="" className="h-10 w-10 rounded-full xl:mr-2.5"/>

            <div className="hidden xl:inline leading-5">
                <h4 className="font-bold">{session.user.name}</h4>
                <p className="text-[#6e767d]">@{session.user.tag}</p>
            </div>

            <Image src="/three.png"  width={18} height={10} className="h-5  hidden xl:inline ml-10"/> 
      </div>

    </div>
  )
}

export default Sidebar
