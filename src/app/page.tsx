import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link  from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";

//adding async makes sure its a server component
export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId; // meaning if userId is not null, then isAuth is true
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-orange-300 to-rose-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">5adm Zebbi</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-2">
            {isAuth && <Button>Go to Resume Optimizer</Button>}
          </div>
        
        <p className="max-w-x1 mt-1 text-lg">
          5adm Zebbi is an Arabic Resume
          optimized for ATS using language models and NLP
        </p>
          
          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ): (
              <Link href="/sign-in">
                <Button>Sign in to get started <LogIn className="w-4 h-4 ml-2" /></Button>
                
              </Link>
            )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
