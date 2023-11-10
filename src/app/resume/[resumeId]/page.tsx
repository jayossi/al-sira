//this will render the Resume page.
// In this page you will manipulate the pdf
//like adding bulletpoints and adding the skills
//All with the help of GPTAPI
import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { eq } from "drizzle-orm";
import ResumeSideBar from "@/components/ResumeSideBar";
import PDFViewer from "@/components/PDFViewer";
import PointsGenerator from "@/components/PointsGenerator";

type Props = {
  params: {
    resumeId: string;
  };
};

const ResumePage = async ({ params: { resumeId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _resumes = await db
    .select()
    .from(resumes)
    .where(eq(resumes.userId, userId));
  if (!{ _resumes }) {
    return redirect("/");
  }
  if (!_resumes.find((resume) => resume.id === parseInt(resumeId))) {
    return redirect("/");
  }

  const current_resume = _resumes.find(
    (resume) => resume.id === parseInt(resumeId)
  );
  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* resume sidebar*/}
        <div className="flex-[1] max-w-xs">
          <ResumeSideBar resumes={_resumes} resumeId={parseInt(resumeId)} />
        </div>
        {/* pdf viewer*/}
        <div className="max-h-screen p-4 overflow-scroll flex-[5]">
          <PDFViewer resume_url={current_resume?.resumeUrl || ""} />
        </div>
        {/* resume editor*/}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <PointsGenerator />
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
