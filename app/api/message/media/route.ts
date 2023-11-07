import { writeFile, unlink } from 'fs/promises'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { join } from 'path'
import { authConfig } from "@/app/api/auth/[...nextauth]/route"
import { fstat } from 'fs'
export const POST = async (request: NextRequest, response: NextResponse) => {
    const data = await request.formData()
    const file: File | null = data.get('image') as unknown as File
    const caption = data.get('caption') || ''
    const recipients = data.get('recipients[0]') as string
    const sessionId = data.get('sessionId')
    if (!file && sessionId && recipients) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
    try {
        const session: any = await getServerSession(
            request as unknown as NextApiRequest,
            {
                ...response,
                getHeader: (name: string) => response.headers?.get(name),
                setHeader: (name: string, value: string) => response.headers?.set(name, value),
            } as unknown as NextApiResponse,
            authConfig
        );
        if (!session?.user) {
            return NextResponse.json({ error: 'Session not found' }, { status: 400 })
        }
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const path = join(process.cwd(), 'public', 'uploads', file.name)
        await writeFile(path, buffer)
        const formdata = new FormData()
        formdata.set('image', file, path)
        formdata.append('caption', caption)
        formdata.append('recipients[0]', recipients)
        const sendMessage = await fetch(process.env.BACKEND_URL + '/messages/' + sessionId + '/send/image', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + session.user.token,
            },
            body: formdata
        })
        if (sendMessage.ok) {
            unlink(path)
            return NextResponse.json({ message: 'success send data' }, { status: 200 })
        }
        unlink(path)
        console.log(await sendMessage.text())
        return NextResponse.json({ message: 'failed to send' }, { status: 500 })

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })

    }
}