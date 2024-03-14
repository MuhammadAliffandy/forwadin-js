import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const registerAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`auth/register`,data)
    return response;
}

export const loginAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`auth/login`,data)
    return response;
}

export const sendVerificationEmailAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`auth/send-verification-email`,data)
    return response;
}

export const verificationEmailAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`auth/send-verify-email`,data)
    return response;
}

export const googleAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`auth/google`,data)
    return response;
}

export const refreshTokenAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`auth/refresh-token`,data)
    return response;
}

export const forgotPasswordAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`auth/forgot-password`,data)
    return response;
}

export const resetPasswordAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`auth/reset-password`,data)
    return response;
}

export const identifiedAvailabilityAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`auth/identifier-availability`,data)
    return response;
}

