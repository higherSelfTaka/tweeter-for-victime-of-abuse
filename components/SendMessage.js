
import {React, useEffect, useState} from 'react'
import {ChevronDoubleRightIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
import {useSession} from "next-auth/react"
import {db} from '../firebase'
import { addDoc, serverTimestamp , doc, collection, onSnapshot} from 'firebase/firestore';
// recoil
import { useRecoilState } from "recoil";
import {listUserIdState,} from "../atoms/modalAtom";

const style={
  form:`h-11 w-full max-w-[320px] flex text-xl absolute buttom-0`,
   input : `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
   button: `w-[20%] bg-black items-center d`
}


const SendMessage = ({scroll}) => {
const { data: session} = useSession();
const [input, setInput] = useState('');
const [userId]= useRecoilState(listUserIdState);
const [user, setUser] = useState([])


useEffect(()=>{
  const getChats=()=>{
  const unsub=onSnapshot(doc(db, "users", userId), (doc)=>{
    setUser(doc.data())
  });
  return ()=>{
    unsub();
  };
};
userId && getChats()
},[userId]);

console.log("user id in message input :::::::::::: !", userId)
console.log(session.user.image)

const sendMessage =async(e)=>{
    e.preventDefault()
    if(input===''){
      alert("please enter a valid message")
      return
    }
    const currentUser=session.user
    const combinedId = currentUser.uid+userId

    console.log("userId is before send a message", userId)
  
      await addDoc(collection(db, `chats/${combinedId}/messages` ),{
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
    
  )
}

export default SendMessage