import {React, useEffect, useState, useContext} from 'react'

// recoil
import {useRecoilState} from "recoil"
import {userIdState} from '../atoms/modalAtom'
import {ChevronDoubleRightIcon, PlusCircleIcon} from "@heroicons/react/24/outline";

import {v4 as uuid} from "uuid"
import {ref,  uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import firebase
import {db} from "../firebase"
import { arrayUnion, Timestamp, updateDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
// session current id 
import {useSession} from "next-auth/react"

function MessageInput() {
  const {data: session} = useSession();
const [text, setText] = useState("")
const [img, setImg] = useState(null)
  
  const currentUserId = session.user.uid
  console.log("currentUser ::::: ", currentUserId)



  console.log("text",text)
  
  const handleSend = async()=>{
    if(img){
     const storageRef = ref(storage, uuid);
     const uploadTask = uploadBytesResumable(storageRef, img)
      uploadTask.on(
        (error)=>{
         // setErr(true);
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
                await updateDoc(doc(db, "chats", state.chatId ),{
                  messages: arrayUnion({
                        id:uuid(),
                        text,
                        senderId: currentUserId,
                        date:Timestamp.now(),
                        img:downloadURL
                    })
                })
            })
        }
      )

    }else {
      
    await updateDoc(doc(db, "chats", state.chatId ),{
      messages:arrayUnion({
           id:uuid(),
           text: text,
           senderId: currentUserId,
           date:Timestamp.now(),
        })
    });
    }
    await updateDoc(doc(db, "userChats", currentUserId),{
      [state.chatId +".lastMessage"]:{
        text
      },
      [state.chatId+".date"]:serverTimestamp()
    })
    await updateDoc(doc(db, "userChats", state.user.uid),{
      [state.chatId +".lastMessage"]:{
        text
      },
      [state.chatId+".date"]:serverTimestamp()
    })
    setText("")
    setImg(null)
  }
    return (
  <div className="sticky top-0 py-1.5 bg-black  z-50 w-full">  
        <div className="flex items-center bg-[#202327] p-3 rounded-lg relative">
            <div className="flex flex-row">
            <ChevronDoubleRightIcon  onClick={handleSend}  className="text-white h-5 z-50 " /> 
            
              <input 
              onChange={(e)=>setText(e.target.value)} 
              type="text" className="bg-transparent placeholder-gray-50 outline-none
              text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full
              focus:border-[#1d9bf0] rounded-lg focus:bg-black
              focus:shadow-lg"/>
            
              <div className="send">
              {/* <img src={Attach} alt=""/> */}
              <input 
              onChange={e=>setImg(e.target.files[0])} 
              type="file" style={{display :"none"}} id="file"/>
              <label htmlFor="file">
                <img src={img} alt=""/>
              </label>
              </div>
            <PlusCircleIcon 
            className="text-white h-5 z-50" />  
            </div>
      
        </div> 
 </div>
  )
}

export default MessageInput
