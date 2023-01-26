
import { React, useState, useEffect, useRef } from 'react'

import SendMessage from './SendMessage'
import {useSession} from 'next-auth/react'
// firebase
import {query, collection, addDoc, serverTimestamp, orderBy, where, limit, onSnapshot} from 'firebase/firestore'
import {db} from '../firebase'
import {ChevronDoubleRightIcon, PlusCircleIcon} from "@heroicons/react/24/outline";

// recoil
import { useRecoilState } from "recoil";
import {chatIdState, listUserIdState,} from "../atoms/modalAtom";
import Moment from 'react-moment';


const style={
  main:`flex flex-col p-[10px] relative`,
  form:`h-11 w-full max-w-[320px] flex text-xl absolute buttom-0`,
   input : `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
   button: `w-[20%] bg-black items-center d`
}

const Chat = ({messages}) => {
 
    const [userId] = useRecoilState(listUserIdState)
    const [chatId] = useRecoilState(chatIdState)
    
    const [input, setInput] = useState('');
    //const [messages, setMessages]=useState([])
    //const [chatId]=useRecoilState(chatIdState)
    const {data:session}=useSession()
    const currentUser=session.user

   
    //const chatId = currentUser.uid + userId
    console.log("messages id is trans ::::" ,messages)
    console.log("chat message is ", chatId)

    const scroll = useRef()

    const sendMessage =async(e)=>{
      e.preventDefault()
      if(input===''){
        alert("please enter a valid message")
        return
      }
      const currentUser=session.user
   
  
      
    
        await addDoc(collection(db, `chats/${chatId}/messages` ),{
              text:input,
              sender:currentUser.name,
              senderIdUserId:currentUser.uid,
              senderImage:currentUser.image,
              timestamp:serverTimestamp()
        })
     
        setInput('')
        scroll.current?.scrollIntoView({ behavior:'smooth' })
  }
  
 
  return (
    <div>
        <main className={style.main}>
         
           {messages && messages?.map(msg=>{
            return (
                // <Message key={Math.random()} messages={msg}/>
                <div >
                <div　
                className="flex w-full mt-2 space-x-3 max-w-xs">
                      <img 
                      //src={messages.currentUserId===currentUser.uid ? messages.userImage : messages.currentImage }
                      src={msg?.senderImage}
                      className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"/>
                      <div>
                      <p className="name text-sm ">{msg.sender}</p>
                        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg mt-2">
                          
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <span className="text-xs text-gray-500 leading-none">
                        <Moment fromNow>{msg?.timestamp?.toDate()}</Moment>
                        </span>
                      </div>
                    </div>
                </div>
            )
          })}       

         
        </main>
        {/* <SendMessage scroll={scroll}/> */}

        <form onSubmit={sendMessage} as="form" className="sticky top-0 py-1.5 bg-black  z-50 w-full">  
              <div className="flex items-center bg-[#000000] p-3 rounded-lg relative">
                  {/* <div className="flex flex-row"> */}

            {/* <form onSubmit={sendMessage} className={style.form }>  */}
              <input 
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              className={style.input} type="tezt" placeholder='Enter Message' />
                  <button className={style.button} type="submit">
                  <ChevronDoubleRightIcon  className="text-white ml-3 h-7 z-50 " /> 
                  </button>
            {/* </form>  */}

            {/* </div> */}
            </div>
      </form>

        <span ref={scroll}></span>
    </div>
    
  )
}

export default Chat
