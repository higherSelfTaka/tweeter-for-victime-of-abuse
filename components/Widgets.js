import React from 'react'
import {ChevronDoubleRightIcon} from "@heroicons/react/24/outline";

function Widgets() {
  return (
    <div　className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="sticky top-0 py-1.5 bg-black 
      z-50 w-11/12 xl:w-9/12">
       <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
       <ChevronDoubleRightIcon className="text-white h-5 z-50" /> 
          <input type="text" className="bg-transparent placeholder-gray-50 outline-none
          text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full
          focus:border-[#1d9bf0] rounded-full focus:bg-black
          focus:shadow-lg"/>
       </div> 
      </div>
      <div className="text-[#d8d8d8] space-y-3 bg-[#15161c] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bond text-xl px-4"> What you can learn</h4>

        {/* VideoThumbNail */}
       
       <button className="hover:bg-white hover:bg-opacity-[0.03]
       px-4 py-3 cursor-pointer transition duration-200
       ease-out flex items-center justify-between w-full text-[#1d9bf0]
       font-light">Show more</button>


      </div>
    </div>
  )
}

export default Widgets
