import Image from 'next/image'
import React from 'react'
import { SidebarMenuButton } from '../ui/sidebar'

const Logo = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
        <Image
        src={"/logo.svg"}
        alt='Code-Builder'
        height={50}
        width={50}
        className='object-contain'
        />
    
    </div>
  )
}

export default Logo