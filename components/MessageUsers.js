import {React, useState, useEffect,} from 'react'
import {useSession} from 'next-auth/react'
// import firebase
import {db} from "../firebase"
import { onSnapshot, doc, query, where , collection, orderBy, getDocs} from 'firebase/firestore' 
import {useCollection } from 'react-firebase-hooks/firestore'
// recoil
import { useRecoilState } from "recoil";
import {chatIdState, listUserIdState,} from "../atoms/modalAtom";
// util
import getOtherUserName from '../utils/getOtherUser'
import getOtherUserImage from '../utils/getOtherUserImage'
import {router, useRouter} from 'next/router'
import { redirect } from 'next/dist/server/api-utils'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import Chat from '../components/Chat'

function MessageUsers() {
    const {data:session}=useSession()
    const currentUser = session.user
    const [user, setUser] = useState()
    const [userId, setUserId]= useRecoilState(listUserIdState);
    const [chatId, setChatId]=useRecoilState(chatIdState)
    const [messages, setMessages] = useState([])
   
  
    const [snapshot] = useCollection(collection(db, "chats"))
   
    const chatlist = snapshot?.docs.map(doc=>({id: doc.id, ...doc.data()}))
  


const handleSelect=async(chatId)=>{


 const q1 = query(collection(db, "chats"),where("chatId","==", chatId));
 try {
    
    const querySnapshot = await getDocs(q1);
    querySnapshot.forEach((doc) => {
   
    setChatId(doc.data().chatId)
  
});
 } catch(err) {}

  const q2 = query(collection(db, `chats/${chatId}/messages`), orderBy("timestamp"));

  const unsub = onSnapshot(q2, (querySnapshot)=>{
    setMessages(querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id})))
  })
 return unsub



}


  return (

<div  className="flex ">
        <div className="w-2/5 mx-2 mt-2 sticky">
    
         
              { chatlist?.filter(chat=>chat.users.includes(currentUser.name)).map(chat=>(
              
              <div 
              key={chat.id}
                  onClick={()=>handleSelect(chat.chatId)}
              
                  className="text-[#d9d9d9] flex item-center justify-left hoverAnimation2 mt-3 xl:ml-auto xl:-mr-3 mt-auto">
                      
                        <img src={getOtherUserImage(chat.images, currentUser)} alt="" className="h-9 w-9 rounded-full xl:mr-2.5"/>  

                      <div className="hidden xl:inline leading-5">
                      <h5 className="font-bold">{getOtherUserName(chat.users, currentUser)}</h5>
                        
                      </div>
              </div>
              ))}
        </div>
     
       <div class="w-3/5 mx-10 mt-5">
         {messages && 
         
           <Chat messages={messages}/>  
        }
       </div> 

</div>



       
  )
}

export default MessageUsers
