
import { useRecoilState } from "recoil";
import { modalState, profileModalState, postIdState, userIdState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  addDoc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  where
} from "@firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import {
  PhotoIcon,  
  ChartBarSquareIcon,
  CalendarIcon,
  EmojiHappyIcon,
  CalendarDaysIcon,
  PhotographIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Moment from "react-moment";


function ProfileModel() {

  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isProfileOpen, setIsProfileOpen] = useRecoilState(profileModalState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const router = useRouter();

  const [occupation, setOccupation]=useState("")
  const [description, setDescription]=useState("")
  const [user, setUser]=useState()
  const [selected, setSelected] = useState("option");


  // set selector of role 
  const handleChange = event => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };
 
  
  

   useEffect(
     ()=>
     onSnapshot(
       query(collection(db, "users"), where("id","==",userId)),
       (snapshot)=>{
         setUser(snapshot.docs.map((doc)=>({
          ...doc.data()
         })))
       }
     ),[db])
  


console.log('user',user)


const UserDataEntry = async(e)=>{
  e.preventDefault();

await setDoc(doc(db, "users", session.user.uid),{
  id:session.user.uid,
  username: session.user.name,
  userImg:session.user.image,
  tag:session.user.tag,
  timestamp: serverTimestamp(),
  occupation:occupation,
  description:description,
  role:selected
 })
  
//await setDoc(doc(db, "userChats", session.user.uid),{})
  
  setIsProfileOpen(false)
  setOccupation("")
  setDescription("")

  router.push(`/Profile`);
};



  return (
    <Transition.Root show={isProfileOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsProfileOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-black rounded-2xl 
            text-left overflow-hidden shadow-xl transform transition-all
            sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
            
            
              {/* Modal */}
              <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                   <div className="hoverAnimation w-9 h-9 flex
                   items-center justify-center xl:px-0 "
                   onClick={()=>setIsProfileOpen(false)}
                   >
                    <XMarkIcon className="h-[22px] text-white"/>
                   </div>
              </div>

              <div class="flex px-4 pt-5 pb-2.5 sm:px-6">
              <div className="w-full">
                        <label for="helper-text" className=" block mb-2 text-sm font-medium text-gray-200 dark:text-white">Are you victim or supporter</label>
                         <select  value={selected} onChange={handleChange}
                         class="form-select form-select-lg mb-3 
                              appearance-none
                              block
                              w-full
                              px-4
                              py-2
                              text-xl
                              font-normal
                              text-gray-700
                              bg-[#e1e0e0] bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded-lg
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-200 focus:bg-[#e1e0e0]] focus:border-blue-600 focus:outline-none" aria-label=".form-select-lg example">
                            <option selected>Open this select menu</option>
                            <option value="1">Victim</option>
                            <option value="2">Supporter</option>
                        </select>


                          <label for="helper-text" className=" block mb-2 mt-2 text-sm font-medium text-gray-300 dark:text-white">
                            Profession
                          </label>
                          <input type="text" id="helper-text" aria-describedby="helper-text-explanation" 
                          className="bg-[#e1e0e0] bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="your profession"
                            onChange={(e)=>setOccupation(e.target.value)}
                           />
 

                          <label for="helper-text" className=" block mb-2 mt-2 text-sm font-medium text-gray-300 dark:text-white">
                            Your Description
                          </label>
                          <textarea type="text" id="helper-text" aria-describedby="helper-text-explanation" 
                          className="bg-[#e1e0e0] bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block  w-full p-2.5  dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Describe who you are!"
                            onChange ={(e)=>setDescription(e.target.value)}
                            />
                </div>
                </div>
             

                    {/* footer */}
                    <div className="flex items-center justify-between pt-2.5">
                        <button
                          className="bg-[#1d9bf0] text-white rounded-full ml-3 mb-3 px-4 py-1.5 font-bold shadow-md
                            hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                          onClick={UserDataEntry}
                        >
                          Reply
                        </button>
                    </div>

            
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ProfileModel;
