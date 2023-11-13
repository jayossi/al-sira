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

    const prompt = {
      role: "System",
      content: `
        قم بتحسين وصف الوظيفة المعطى للدور \${context.role} باستخدام نموذج OpenAI للغة. 
        يتم توفير الوصف بالتفصيل مع المعلومات التالية:
        
        الدور: \${context.role}
        الوصف: \${context.description}
    
        مهمتك هي تحسين وتعزيز لغة وصف الوظيفة لتحقيق وضوح أفضل وجاذبية. 
        تأكد من أن المعلومات مقدمة بطريقة مقنعة لجذب المرشحين المحتملين. 
        انتبه إلى النحو والترقيم والتناغم العام.
    
        بالإضافة إلى ذلك، إذا كان هناك أي سمات أو مؤهلات محددة مطلوبة لدور 
        \${context.role}، فكر في التأكيد عليها في الوصف. قدم وصف وظيفي 
        جيد التنظيم يمثل بدقة المسؤوليات والتوقعات المرتبطة بالدور.
    
        تذكر أن الهدف هو إنشاء وصف وظيفي جذاب ومعلوماتي يتناسب مع المرشحين 
        المناسبين لموقف \${context.role}. لا تتردد في إجراء تعديلات وتحسينات 
        معقولة مع الحفاظ على الأساس الذي قدم في السياق.
      `,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: {
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      },
      stream: true,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {}
}
