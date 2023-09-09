import prisma from "@/utils/db"
import { NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'
import { sendOTPEmail } from "@/utils/email"
import { generateOTP } from "@/utils/otp"
import { checkUserExist, findUserByAllParams } from "@/utils/helper/dbHelper"
import { checkPasswordStrength, hashPassword } from "@/utils/helper/passwordHelper"
import { UserRegisterData } from "@/utils/interfaces"
import { data } from "autoprefixer"

interface SendEmailResult {
    success: Boolean,
    error?: Error
}

export const POST = async (request: Request) => {
    const result = await setTimeout(() => {
        console.log('timeOut')
        return new Response(JSON.stringify({ msg: "lala" }), { status: 200 })
    }, 3000);

    // const userData: UserRegisterData = await request.json()
    // const checkPassword = checkPasswordStrength(userData.password)
    // if(!checkPassword)
    //     return new Response(JSON.stringify({message: ""}))
    // if (userData.password !== userData.confirmPassword)
    // if (!userData.otp) {
    //     const findUser = await checkUserExist({ userData.username, userData.email, userData.phone })
    //     if (findUser)
    //         return new Response(JSON.stringify({ message: "Username, Email, or Whatsapp Number already exist!" }), { status: 400 })
    //     const otp = generateOTP()
    //     const sendEmailResult: SendEmailResult = await sendOTPEmail("Send OTP", userData.email, otp)
    //     if (sendEmailResult.success) {
    //         try {
    //             const hash_password = await hashPassword(userData.password)
    //             const createUser = await prisma.user.create({
    //                 data: {
    //                     username: userData.username,
    //                     phone: userData.phone,
    //                     email: userData.email,
    //                     password: hash_password,
    //                     accountApiKey: "", //masih blank dulu
    //                     affiliationLink: "",
    //                     emailOtpCode: otp,
    //                     subscriptionId: 0, //blank dulu
    //                 }
    //             })
    //             return new Response(JSON.stringify({ message: "User has beed Created!" }), { status: 200 })
    //         } catch (error) {
    //             return new Response(JSON.stringify({ message: error }), { status: 500 })
    //         }

    //     }
    //     return new Response(JSON.stringify({ message: sendEmailResult.error }), { status: 500 })
    // }
    // strict check user by all 3 params to make sure the user is correct
    // const checkUser = await findUserByAllParams({ userData.username, userData.email, userData.phone })
    // if (!checkUser)
    //     return new Response(JSON.stringify({ message: "User not Found!" }), { status: 400 })
    // if (userData.otp !== checkUser.emailOtpCode)
    //     return new Response(JSON.stringify({ message: "Invalid OTP Code!" }), { status: 400 })
}