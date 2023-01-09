import React from 'react'
import {signIn} from "next-auth/react";
import Image from 'next/image';


function Login({providers}) {
  return (
    <div class="flex flex-col items-center space-y-20 pt-48">
        <Image
            src="/logo.png"
            width={150}
            height={150}
            objectFit="contain"
        />
        <div>
            {Object.values(providers).map(provider=>(
                <div key={provider.name}>
                    {/* https://devdojo.com/tailwindcss/buttons#_ */}
                    <a href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                    onClick={()=>signIn(provider.id, {callbackUrl:"/"})}
                    >
                    <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                    <span class="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                    <span class="relative text-white">Sign in with {provider.name}</span>
                    </span>
                    </a>

                </div>
            ))}
        </div>
    </div>
  )
}

export default Login
