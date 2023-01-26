import React from 'react'
import {useRouter} from "next/router"


function SidebarLink({Icon, text, active, pathname, id}) {
  const router = useRouter();
  return (
    <div className={`text-[#a4344e] flex items-center justify-center
    xl:justify-start text-xl space-x-3 hoverAnimation
    ${active && "font-bold"}
    `}>

     <Icon className="h-7"/>
      <span 
      // onClick={()=>router.push(`/${pathname}`)}
      onClick={(e)=>{
        e.stopPropagation();
        router.push({
          pathname:pathname,
          query:{id:id}
        })
      }}
      className="hidden xl:inline">{text}</span>
    </div>
  )
}

export default SidebarLink
