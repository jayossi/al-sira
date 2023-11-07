import { loadS3IntoPinecone } from "@/lib/pinecone"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json()
        const { file_key, file_name } = body
        console.log(file_key, file_name)
        const pages = await loadS3IntoPinecone(file_key)
        return NextResponse.json({ pages })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })

    }
}