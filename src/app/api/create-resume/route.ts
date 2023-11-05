import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json()
        const { file_key, file_name } = body
        console.log(file_key, file_name)
        return NextResponse.json({message: 'File uploaded successfully'})
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })

    }
}