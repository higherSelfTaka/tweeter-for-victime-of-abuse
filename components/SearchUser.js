import {React, useState, useEffect} from 'react'
import {ChevronDoubleRightIcon, CurrencyEuroIcon} from "@heroicons/react/24/outline";
// firebase
import {db} from "../firebase"
import {collection, getDoc, doc, getDocs, query, setDoc, updateDoc, where, serverTimestamp, addDoc} from "firebase/firestore"
import {useSession} from 'next-auth/react'
// recoil 
import {useRecoilState} from "recoil"
import {userIdState, chatIdState} from '../atoms/modalAtom'

const UserSearch=()=> {

    
const [username, SetUsername] =useState("")
const [user, setUser] = useState(null)
const [err, setErr] = useState(false)
const { data: session} = useSession();
const [chatId, setChatId]=useRecoilState(chatIdState)


const handleSearch=async()=>{
    const q = query(collection(db, "users"),
    where("username","==", username)
    );
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            setUser(doc.data())
        })
    } catch(err) {
    setErr(true)
    } 
};



const handleKey =(e)=>{
    e.code === "Enter" && handleSearch();
}

const handleSelect = async()=>{
   
   console.log(user.id)
  
   const chatExists = (username)=>chats?.find(chat=>(chat.users.includes(currentUser.uid) && chat.users.includes(user.username)))
   console.log("user id ::::", user.id)
        try {
            const currentUser = session.user
            const combinedId = currentUser.uid + user.id 
            setChatId(combinedId)
         
          await setDoc(doc(db,"chats", combinedId),{ 
            users:[currentUser.name, user.username],
            images:[currentUser.image, user.userImg],
            chatId:currentUser.uid+user.id,
            currentUserId:currentUser.uid,
            userId:user.id
          })
   
       
        } catch(err) {

        }

    // create user chats
  setUser(null);
  SetUsername("")
 
}

  return (
    <div className="sticky top-0 py-1.5 bg-black  z-50 w-full">
        
       <div className="flex items-center bg-[#202327] p-3 rounded-lg relative">
       <ChevronDoubleRightIcon className="text-white h-3 z-50" /> 
          <input type="text" 
          onKeyDown={handleKey}
          onChange={(e)=>SetUsername(e.target.value)}
          value={username}
          className="bg-transparent placeholder-gray-50 outline-none
          text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full
          focus:border-[#1d9bf0] rounded-lg focus:bg-black
          focus:shadow-lg"/>
       </div> 

       {err && <span className="pl-5"> User not Found! </span>}

        {user && (
        <div 
        onClick={handleSelect}
        className="text-[#d9d9d9] flex item-center justify-left hoverAnimation2 mt-5
        xl:ml-auto xl:-mr-3 mt-auto">
            <img src={user?.userImg} alt="" className="h-9 w-9 rounded-full xl:mr-2.5"/>

            <div className="hidden xl:inline leading-5">
                <h5 className="font-bold">{user?.username}</h5>
                <p className="text-[#6e767d]">@{user?.tag}</p>
            </div>
        </div>

        )}

    

    </div>




  )
}

export default UserSearch
