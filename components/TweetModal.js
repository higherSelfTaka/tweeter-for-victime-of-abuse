import React from 'react'
import { useRecoilState } from "recoil";
import { tweetModalState} from "../atoms/modalAtom";
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
import Input from '../components/Input'

function TweetModal() {

const [isTweetModalOpen, setIsTweetModalOpen]=useRecoilState(tweetModalState)



  return (
    <Transition.Root show={isTweetModalOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsTweetModalOpen}>
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
                   onClick={()=>setIsTweetModalOpen(false)}
                   >
                    <XMarkIcon className="h-[22px] text-white"/>
                   </div>
              </div>

                    {/* <div class="flex px-4 pt-5 pb-2.5 sm:px-6">
                        <div className="w-full"> */}
                          <Input/>
                        {/* </div>
                    </div> */}
                
                    {/* <div className="flex items-center justify-between pt-2.5">
                        <button
                          className="bg-[#1d9bf0] text-white rounded-full ml-3 mb-3 px-4 py-1.5 font-bold shadow-md
                            hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                        //   onClick={UserDataEntry}
                        >
                          Reply
                        </button>
                    </div> */}

            
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default TweetModal
