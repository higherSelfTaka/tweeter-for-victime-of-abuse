import {React, useState, useEffect, useRef} from 'react'
import {useSession} from 'next-auth/react'

// import firebase
import {db} from "../firebase"
import { onSnapshot, doc, where } from 'firebase/firestore' 
import Moment from 'react-moment';


const style={
	message:`flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
	name:`absolute mt-[-4rem] text-gray-600 text-xs`,
    sent: `bg-[#395dff] text-white flex-row-reverse text-end fload-right rounded-bl-full`,
	received: `bg-[#e5e5ea] text-black float-left rounded-br-full`
}

const Message=({messages})=> {

const ref = useRef()


console.log("messages is massagees", messages)

  return (
	 <div　ref={ref}>
          <div >
			<div　
			className="flex w-full mt-2 space-x-3 max-w-xs">
						<img 
						//src={messages.currentUserId===currentUser.uid ? messages.userImage : messages.currentImage }
						src={messages?.currentImage}
						className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"/>
						<div>
						<p className="name text-sm ">{messages.sender}</p>
							<div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg mt-2">
								
								<p className="text-sm">{messages.text}</p>
							</div>
							<span className="text-xs text-gray-500 leading-none">
							<Moment fromNow>{messages?.timestamp?.toDate()}</Moment>
							</span>
						</div>
					</div>
			</div>
	  </div>

  )
}

export default Message
