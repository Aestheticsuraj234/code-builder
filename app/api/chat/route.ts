// app/api/chat/route.ts
import { currentUser } from "@/feature/auth/actions";
import { BASE_PROMPT } from "@/feature/home/constants/prompt";
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

    const { title, prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid prompt: A non-empty string is required." },
        { status: 400 }
      );
    }

    // Store the chat in the database
    const newMessage = await db.chats.create({
      data: {
        userId: user.id!,
        title,
        prompt,
      },
    });

    const CustomPrompt = `Here is Your Prompt as ${prompt} so you need to Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra`;

    // Send the prompt to your locally running Ollama DeepSeek model.
    const ollamaResponse = await fetch(
      "http://localhost:11434/v1/chat/completions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-r1:7b",
          messages: [{ role: "user", content: CustomPrompt }],
          stream: true,
        }),
      }
    );

    if (!ollamaResponse.ok) {
      return NextResponse.json(
        { error: `Error from Ollama: ${ollamaResponse.statusText}` },
        { status: ollamaResponse.status }
      );
    }

    // Process the stream using a pipeline.
    const textStream = ollamaResponse.body?.pipeThrough(
      new TextDecoderStream()
    );
    if (!textStream) {
      return NextResponse.json(
        { error: "No response body available from Ollama." },
        { status: 500 }
      );
    }

    const jsonTransform = new TransformStream<string, any>({
      transform(chunk, controller) {
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.substring("data: ".length).trim();
            if (jsonStr === "[DONE]") continue;
            try {
              const parsed = JSON.parse(jsonStr);
              controller.enqueue(parsed);
            } catch (error) {
              console.error("JSON parse error:", error);
            }
          }
        }
      },
    });

    const jsonStream = textStream.pipeThrough(jsonTransform);

    // Read from the jsonStream and collect chunks into an array.
    const reader = jsonStream.getReader();
    const chunks: string[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (
        value?.choices &&
        value.choices[0]?.delta &&
        typeof value.choices[0].delta.content === "string"
      ) {
        chunks.push(value.choices[0].delta.content);
      }
    }

    // Determine the final answer by taking the second-to-last chunk if available.
    let finalAnswer = "";
    if (chunks.length >= 2) {
      finalAnswer = chunks[chunks.length - 2].trim();
    } else if (chunks.length === 1) {
      finalAnswer = chunks[0].trim();
    }

    console.log("Collected chunks:", chunks);
    console.log("Extracted answer:", finalAnswer);

    // Branch logic based on finalAnswer.
    if (finalAnswer === "react") {
      return NextResponse.json({
        prompts: [
          BASE_PROMPT,
          `Here is an artifact that contains all files of the project visible to you.
Consider the contents of ALL files in the project.

${reactBasePrompt}

Here is a list of files that exist on the file system but are not being shown to you:
  - .gitignore
  - package-lock.json`,
        ],
        uiPrompts: [reactBasePrompt],
        newMessage
      });
    }

    if (finalAnswer === "node") {
      return NextResponse.json({
        prompts: [
          `Here is an artifact that contains all files of the project visible to you.
Consider the contents of ALL files in the project.

${reactBasePrompt}

Here is a list of files that exist on the file system but are not being shown to you:
  - .gitignore
  - package-lock.json`,
        ],
        uiPrompts: [nodebasePrompt],
        newMessage
      });
    }


     return NextResponse.json({message: "You cant access this"}, {status:403})
   
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
