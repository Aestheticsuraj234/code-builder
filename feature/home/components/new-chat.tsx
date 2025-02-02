"use client";
import React from 'react'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';


const NewChatButton = () => {
  return (
    <Button size={"default"} variant={"outline"} className='flex flex-row items-center justify-center gap-2 w-full mt-2'>
        <Plus size={18}/>
        New Chat
    </Button>
  )
}

export default NewChatButton