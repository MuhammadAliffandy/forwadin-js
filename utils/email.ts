import nodemailer from 'nodemailer'

export const sendOTPEmail = async (subject: String, toEmail: String, otpText: String | null) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        },
        tls: { rejectUnauthorized: false }
    })
    const sendResult = await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: toEmail,
        subject: subject,
        text: otpText
    })
        .then(val => {
            return { success: true }
        })
        .catch(error => {
            return { success: false, error: error }
        })

    return sendResult
}