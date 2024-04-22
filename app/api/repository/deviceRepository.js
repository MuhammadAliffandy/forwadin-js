import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAllDevice = async (token) => {
    await delay()
    const response = await PROVIDER_GET(`devices`, token)
    return response;
}

export const getDevice = async (token, deviceId) => {
    await delay()
    const response = await PROVIDER_GET(`devices/${deviceId}`, token)
    return response;
}

export const getLabelsDevice = async (token) => {
    await delay()
    const response = await PROVIDER_GET(`devices/labels`, token)
    return response;
}

export const createDevice = async (token, data) => {
    await delay()
    const response = await PROVIDER_POST(`devices/create`, data, token)
    return response;
}

export const generateAPIKEYDevice = async (token, deviceId) => {
    await delay()
    const response = await PROVIDER_GET(`devices/api-key/${deviceId}`, token)
    return response;
}

export const updateDevice = async (token, deviceId, data) => {
    await delay()
    const response = await PROVIDER_PUT(`devices/${deviceId}`, data, token)
    return response;
}

export const deleteDevice = async (token, data) => {
    await delay()
    const response = await PROVIDER_DELETE(`devices`, data, token)
    return response;
}