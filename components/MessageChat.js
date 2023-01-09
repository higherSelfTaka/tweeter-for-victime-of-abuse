import React ,{useContext, useEffect, useState, useRef}from 'react'

// import firebase
import {db} from "../firebase"
import { onSnapshot, doc } from 'firebase/firestore' 

// recoil
import {useRecoilState} from "recoil"
import {userIdState} from '../atoms/modalAtom'
import MessageInput from '../components/MessageInput'



const MessageChat=()=> {

	const currentUser = useRecoilState(userIdState)
	//	const {state} = useContext(ChatContext)
	const [messages, setMessages]=useState([])

const style={
	message:`flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
	name:`fixed mt-[-4rem] text-gray-600 text-xs`,
	sent: `bg-[#395dff] text-white flex-row-reverse text-end fload-right rounded-bl-full`,
	received: `bg-[#e5e5ea] text-black float-left rounded-br-full`
}

const ref = useRef()

useEffect(()=>{
	ref.current?.scrollIntoView({behavior:"smooth"})
},[messages])



  return (
	<div　ref={ref}>
		{messages.map((m)=>(
			<div　message={m} key={m.id} 
			className="flex w-full mt-2 space-x-3 max-w-xs">
						<img 
						src={m.senderId===currentUser.uid ? currentUser.userImg : state.user.userImg}
						className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"/>
						<div>
							<div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
								<p className="text-sm">{m.text}</p>
							</div>
							<span className="text-xs text-gray-500 leading-none">2 min ago</span>
						</div>
					</div>
		))}


			<MessageInput/>

	 </div>
	


  )
}

export default MessageChat
