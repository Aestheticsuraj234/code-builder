import { currentUser } from "@/feature/auth/actions";
import { getChatById } from "@/feature/chat/actions";
import ChatHeader from "@/feature/chat/components/chat-header";
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
    <main className="container flex flex-col items-start justify-start mx-4 my-4">
      <ChatHeader userImage={user?.image!} chatTitle={chat.title} />
    </main>
  );
};

export default ChatIdMainPage;
