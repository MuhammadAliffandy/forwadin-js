import { fetchServer } from "@/utils/helper/fetchServer";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest, response: NextResponse) => {
    const result = await fetchServer(request, response, { url: '/auth/send-verification-email', method: 'POST' })

    if (!result)
        return NextResponse.json({ message: 'Session not found' }, { status: 500 })
    if (!result.ok)
        return NextResponse.json({ message: 'Failed to send OTP' }, { status: result.status })
    return NextResponse.json({ message: 'Success send OTP' }, { status: result.status })
}
export const POST = async (request: NextRequest, response: NextResponse) => {
    const body = await request.json()
    const result = await fetchServer(request, response, { url: '/auth/verify-email', body: { otpToken: body.token }, method: 'POST' })
    if (!result)
        return NextResponse.json({ message: 'Session not found' }, { status: 500 })
    const data = await result.json()
    if (!result.ok)
        return NextResponse.json({ message: data.message }, { status: 500 })
    return NextResponse.json({ message: 'Success send OTP' }, { status: result.status })
}