import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import { getS3Url } from "@/lib/s3";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "You must be logged in to create a resume" },
      { status: 401 }
    );
  }
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log(file_key, file_name);
    await loadS3IntoPinecone(file_key);
    const resume_id = await db
      .insert(resumes)
      .values({
        fileKey: file_key,
        resumeName: file_name,
        resumeUrl: getS3Url(file_key),
        userId,
      })
      .returning({
        insertedId: resumes.id,
      });
    return NextResponse.json(
      {
        resume_id: resume_id[0].insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
