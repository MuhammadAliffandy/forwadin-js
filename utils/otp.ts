import otpGenerator from 'otp-generator'
const OTP_CONFIG = {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
}
export const generateOTP = () => {
    const otp = otpGenerator.generate(process.env.OTP_LENGTH, OTP_CONFIG)
    return otp
}