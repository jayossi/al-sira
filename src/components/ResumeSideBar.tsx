import React from "react";
import { DrizzleResume } from "@/lib/db/schema";
import Link from "next/link";
import { MessageCircle, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import next from "next";
import { cn } from "@/lib/utils";

type Props = {
  resumes: DrizzleResume[];
  resumeId: number;
};

const ResumeSideBar = ({ resumes, resumeId }: Props) => {
  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Resume
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {resumes.map((resume) => (
          <Link href={`/resume/${resume.id}`} key={resume.id}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-white": resume.id === resumeId,
                "hover: text-white": resume.id !== resumeId,
              })}
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {resume.resumeName}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 ">
        <div className="flex items-center text-sm gap-2 text-slate-500 flex-wrap">  
            <Link href="/"> Home </Link>
            <Link href="/"> Source</Link>
            {/* Stripe Button */}
        </div>
      </div>
    </div>
  );
};

export default ResumeSideBar;
