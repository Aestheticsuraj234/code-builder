import { currentUser } from "@/feature/auth/actions";
import { getChatById } from "@/feature/chat/actions";
import ChatHeader from "@/feature/chat/components/chat-header";
import {OutputContainer} from "@/feature/chat/components/output-container";

import React from "react";

const ChatIdMainPage = async ({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) => {
  const user = await currentUser();
  const chatId = (await params).chatId;


  const chat = await getChatById(chatId);
  return (
    <div className=" flex flex-col w-full h-full justify-start items-center mt-10 dark:bg-[#0E0F11] bg-white space-y-10">
      <ChatHeader userImage={user?.image!} chatTitle={chat.title} />
      <OutputContainer className={"bg-[rgb(20,21,20)]"}/>
    </div>
  );
};

export default ChatIdMainPage;
