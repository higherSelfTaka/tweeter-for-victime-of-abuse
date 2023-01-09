import {React, useState, useEffect, useContext} from 'react'
import {useSession} from 'next-auth/react'

// import firebase
import {db} from "../firebase"
import { onSnapshot, doc } from 'firebase/firestore' 
import {ChatContext} from '../context/ChatContext'

function MessagePost() {
  
const {data:session} = useSession()
const [chats,setChats]=useState([])
const currentUser = session.user
const {dispatch} = useContext(ChatContext);

 useEffect(()=>{
  const getChats =()=>{
     const unsub=onSnapshot(doc(db,"userChats", currentUser.uid),(doc)=>{
      console.log("Current data :", doc.data())
       setChats(doc.data());
     })
     return ()=>{
       unsub();
     };
       };
// if current user uid and get chat useeffect
   currentUser.uid && getChats()
 },[currentUser.uid])

console.log("chats:",Object.entries(chats))

//console.log("chats", chats)

const handleSelect=(u)=>{
  dispatch({type:"CHANGE_USER", payload:u})
  console.log("uuuuuuu ::::::", u)
}


return (
<div>
    {Object.entries(chats)?.map(chat=>(
 <div 
    key={chat[0]}
    onClick={handleSelect(chat[1].userInfo)}
    className="text-[#d9d9d9] flex item-center justify-left hoverAnimation2 mt-3 xl:ml-auto xl:-mr-3 mt-auto">
        
        <img src={chat[1].userInfo.userImg} alt="" className="h-9 w-9 rounded-full xl:mr-2.5"/>

        <div className="hidden xl:inline leading-5">
            <h5 className="font-bold">{chat[1].userInfo.username}</h5>
            <p className="text-[#6e767d]">{chat[1].userInfo.lastMessage?.text}</p>
        </div>

       
   </div>
   ))}
</div>


  )
}

export default MessagePost
