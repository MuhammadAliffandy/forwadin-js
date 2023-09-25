import { fetchServer } from "@/utils/helper/fetchServer";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest, response: NextResponse) => {
    console.log(request)
    const result = await fetchServer(request, response, { url: '/', body: 'asd', method: 'POST' })

    if (!result)
        return NextResponse.json({ message: 'Session not found' }, { status: 500 })
    if (!result.ok)
        return NextResponse.json({ message: 'Failed to send OTP' }, { status: result.status })
    return NextResponse.json({ message: 'Success send OTP' }, { status: result.status })
}