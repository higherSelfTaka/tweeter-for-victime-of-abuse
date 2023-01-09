import {React, useEffect, useState} from 'react'
import {SparklesIcon} from "@heroicons/react/24/outline"
import {useSession} from "next-auth/react"
import Input from '../components/Input'


import {db} from "../firebase"
import {onSnapshot, collection, query, orderBy} from '@firebase/firestore'
import Chat from './Chat'

import SearchUser from './SearchUser'
import MessageUsers from './MessageUsers'


function MessageFeed() {



  return (
    <div className="text-white flex-grow border-l border-r 
    border-gray-800 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
     <div className="text-[#d9d9d9] flex items-center 
     sm:justify-between py-2 px-3 sticky top-0 z-50 bg-[#131313]
     border-b border-gray-800">
       <h2 className="text-lg sm:text-xl font-bold">Message</h2>
       <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">

        <SparklesIcon className="h-5 text-white"/>
       </div>
     </div>

    

     <div className="pb-1">
       
            <SearchUser/>
            <MessageUsers/>
           
     </div>

    </div>
  )
}

export default MessageFeed
