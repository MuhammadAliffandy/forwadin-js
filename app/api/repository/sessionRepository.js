import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const createSession = async ({ data }) => {
    await delay()
    const response = await PROVIDER_POST(`sessions/create`,data)
    return response;
}

export const getProfileSession = async ({ deviceId}) => {
    await delay()
    const response = await PROVIDER_GET(`sessions/${deviceId}/profile`)
    return response;
}

export const updateProfileSession = async ({ deviceId , data}) => {
    await delay()
    const response = await PROVIDER_PUT(`sessions/${deviceId}/profile` , data)
    return response;
}

export const getAllSession = async () => {
    await delay()
    const response = await PROVIDER_GET(`sessions/`)
    return response;
}