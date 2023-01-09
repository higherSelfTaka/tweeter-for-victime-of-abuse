import {React, useState, useEffect} from 'react'
import {ChevronDoubleRightIcon} from "@heroicons/react/24/outline";
// firebase
import {db} from "../firebase"
import {collection, getDoc, doc, getDocs, query, setDoc, updateDoc, where, serverTimestamp} from "firebase/firestore"
import {useSession} from 'next-auth/react'

const UserSearch=()=> {

    
const [username, SetUsername] =useState("")
const [user, setUser] = useState(null)
const [err, setErr] = useState(false)
const { data: session} = useSession();

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
    // check whether the group(chats collection) exists, if not create new one 
    const currentUserId = session.user.uid
    
    const currentUser = session.user
  

     try {
        const res = await getDoc(doc(db, "chats", combinedId));
        console.log("res combinedID ",combinedId)


        if(!res.exists()){
              // create a chat in chats collection
            console.log("combinedId2::::", combinedId)
          const combinedId = 
        currentUser.uid > user.id 
        ? currentUser.uid + user.id 
        : user.id + currentUser.uid;

        console.log("currentUserId::::", currentUserId)
        console.log("userId::::" , user.id)
        console.log("combinedId::::", combinedId)  
          
            await setDoc(doc(db, "chats", combinedId),{messages:[]});
            // create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid),{
                [combinedId+".userInfo"]:{
                    uid:user.id,
                    username:user.username,
                    userImg:user.userImg
                },
                [combinedId+".date"]:serverTimestamp()
            });
            console.log("userId::::", user.id, user.userImg, user.username)
            await updateDoc(doc(db, "userChats", user.id),{
                [combinedId+".userInfo"]:{
                    uid:currentUser.uid,
                    username:currentUser.username,
                    userImg:currentUser.userImg
                },
                [combinedId+".date"]:serverTimestamp(),
            });
            
        }
     }catch(err){}

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
