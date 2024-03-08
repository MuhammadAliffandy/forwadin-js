import { NextRequest, NextResponse } from "next/server";

export const POST = async (request) => {
    const body = await request.json()
    let isError = false
    const checkIdentifier = async (type, identifier) => {
        const result = await fetch(process.env.BACKEND_URL + '/auth/check-identifier-availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [type]: identifier
            })
        })
            .then(response => response.status === 200 ? true : false)
            .catch(error => {
                isError = true
                return error
            })

        return result
    }

    const message = {
        username: await checkIdentifier('username', body.username),
        phone: await checkIdentifier('phone', body.phone),
        email: await checkIdentifier('email', body.email)
    }
    if (isError)
        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    return NextResponse.json(message, { status: 200 })
}