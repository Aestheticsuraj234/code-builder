// app/api/chat/route.ts
import { currentUser } from "@/feature/auth/actions";
import { BASE_PROMPT , getSystemPrompt } from "@/feature/home/constants/prompt";
import { basePrompt as nodebasePrompt } from "@/feature/home/constants/template/node";
import { basePrompt as reactBasePrompt } from "@/feature/home/constants/template/react";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
   const user = await currentUser();
   if (!user) {
    throw new Error("User not found");
  }
  const { messages } = await req.json();

  const ollamaResponse = await fetch(
    "http://localhost:11434/v1/chat/completions",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-r1:7b",
        messages: messages,
        system:getSystemPrompt()
        
      }),
    }
  );
  console.log(ollamaResponse);
 
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
