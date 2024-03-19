import { NextRequest, NextResponse } from "next/server";
import { registerAuth } from "../../repository/authRepository";
export const POST = async (request) => {
    const body = await request.json()

    try {
        const result = await registerAuth(body)
        const message = await result.json()
        if (!result.ok) {
            return NextResponse.json({ message: message.error }, { status: 400 })
        }
        return NextResponse.json({ message: message }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}