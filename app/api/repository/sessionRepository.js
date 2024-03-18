import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const createSession = async (  token , data ) => {
    await delay()
    const response = await PROVIDER_POST(`sessions/create`,data ,token)
    return response;
}

export const getProfileSession = async (token, deviceId ) => {
    await delay()
    const response = await PROVIDER_GET(`sessions/${deviceId}/profile`,token)
    return response;
}

export const updateProfileSession = async (  token ,deviceId , data) => {
    await delay()
    const response = await PROVIDER_PUT(`sessions/${deviceId}/profile` , data , token )
    return response;
}

export const getAllSession = async (token) => {
    await delay()
    const response = await PROVIDER_GET(`sessions/`,token)
    return response;
}