import {React, useState, useEffect,} from 'react'
import {useSession} from 'next-auth/react'

// import firebase
import {db} from "../firebase"
import { onSnapshot, doc } from 'firebase/firestore' 
// recoil
import { useRecoilState } from "recoil";
import {listUserIdState,} from "../atoms/modalAtom";



const Chats =()=>{
    const {data:session} = useSession()
    
    const [chats,setChats]=useState([])
    const currentUser = session.user
    const [user] = useRecoilState(listUserIdState)
   

    console.log(user.id)

    useEffect(()=>{
      const getChats=()=>{
      const unsub=onSnapshot(doc(db, "messages", currentUser.uid), 
      where("userId","==",user.id),
      (doc)=>{
        setChats(doc.data())
      });
      return ()=>{
        unsub();
      };
    };
    currentUser.uid && getChats()
    },[currentUser.uid]);

    const handleSelect=(u)=>{
        dispatch({type:"CHANGE_USER", payload:u})
      }
      
    return (

            <div>
            {chatUsers.sort((a,b)=>b[1].date - a[1].date).map(chat=>(
              
            <div 
                key={chat[0]}
                 onClick={()=>handleSelect(chat[1].userInfo)}
                 className="text-[#d9d9d9] flex item-center justify-left hoverAnimation2 mt-3 xl:ml-auto xl:-mr-3 mt-auto">
                    
                    <img src={chat[1].userInfo.userImg} alt="" className="h-9 w-9 rounded-full xl:mr-2.5"/>

                    <div className="hidden xl:inline leading-5">
                     <h5 className="font-bold">{chat[1].userInfo.username}</h5>
                     <p className="text-[#6e767d]">{chat[1].lastMessage?.text}</p>
                    </div>
             </div>
        ))}
         </div>
    )
}


export default Chats