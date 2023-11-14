import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getContext } from "@/lib/context";
import { resumes } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { Message } from "ai";
export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages, resumeId } = await req.json();
    const _resumes = await db
      .select()
      .from(resumes)
      .where(eq(resumes.id, resumeId));
    if (_resumes.length === 0) {
      return NextResponse.json({ error: "resume not found" }, { status: 404 });
    }
    const filekey = _resumes[0].fileKey;
    const lastmessage = messages[messages.length - 1];
    const context = await getContext(lastmessage.content, filekey);
    console.log("context: ", context);
    const prompt = {
      role: "system",
      content: `
        AI assistant is a brand new, powerful, human-like artificial intelligence.
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      `,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {}
}
