"use server";
import { currentUser } from "@/feature/auth/actions";
import { db } from "@/lib/db";

export const getChatById = async (chatId: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found. Please login first.");
  }

 
  const existingChat = await db.chats.findUnique({
    where: { id: chatId },

    select: {
      id: true,
      title: true,
      prompt: true,

    },
  });

  if (!existingChat) {
    throw new Error("Chat not found");
  }

  return existingChat;
};
