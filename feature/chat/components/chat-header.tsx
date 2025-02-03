import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
 
interface Props{
  userImage:string | null ;
  chatTitle:string
}
const ChatHeader = ({userImage , chatTitle}:Props) => {
  return (
    <div className='flex flex-row justify-center items-center gap-2'>
        <Avatar>
      <AvatarImage src={userImage!} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <p className='font-normal text-sm text-zinc-800 dark:text-white'>
      {chatTitle}
    </p>
    </div>
  )
}

export default ChatHeader