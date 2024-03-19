import { writeFile, unlink } from 'fs/promises'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { authConfig } from "@/app/api/auth/[...nextauth]/route"
import { sendImageMessages , sendDocumentMessages } from "../../repository/messageRepository";
// export const config = {
//     api: {
//         bodyParser: false
//     },
// }
export const POST = async (request, response) => {
    const data = await request.formData()
    const file = data.get('document') 
    console.log(file.type)
    const caption = data.get('caption') || ''
    const recipients = data.get('recipients[0]') 
    const sessionId = data.get('sessionId')
    if (!file && sessionId && recipients) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
    try {
        const session  = await getServerSession(
            request,
            {
                ...response,
                getHeader: (name) => response.headers?.get(name),
                setHeader: (name, value) => response.headers?.set(name, value),
            } ,
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
        formdata.append('caption', caption)
        formdata.append('recipients[0]', recipients)
        if (file.type.includes('image')) {
            formdata.set('image', file, path)

            const sendMessage = await sendImageMessages(session.user.token , sessionId , formdata )

            console.log(sendMessage.status)
            console.log(await sendMessage.text())
            if (sendMessage.ok) {
                unlink(path)
                return NextResponse.json({ message: 'success send data' }, { status: 200 })
            }
            if (sendMessage.status === 401) {
                return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
            }
        } else {
            formdata.set('document', file, path)
            const sendMessage = await sendDocumentMessages(session.user.token , sessionId , formdata)
            console.log(sendMessage.status)
            console.log(await sendMessage.text())
            if (sendMessage.ok) {
                unlink(path)
                return NextResponse.json({ message: 'success send data' }, { status: 200 })
            }
            if (sendMessage.status === 401) {
                return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
            }
        }
        unlink(path)

        return NextResponse.json({ message: 'failed to send' }, { status: 500 })

    } catch (error) {
        console.log(error)
        const path = join(process.cwd(), 'public', 'uploads', file.name)
        unlink(path)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}