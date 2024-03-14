import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAllDevice = async () => {
    await delay()
    const response = await PROVIDER_GET(`devices/`)
    return response;
}

export const getDevice = async ({deviceId}) => {
    await delay()
    const response = await PROVIDER_GET(`devices/${deviceId}`)
    return response;
}

export const getLabelsDevice = async () => {
    await delay()
    const response = await PROVIDER_GET(`devices/labels`)
    return response;
}

export const createDevice = async ({data}) => {
    await delay()
    const response = await PROVIDER_POST(`devices/create`,data)
    return response;
}

export const generateAPIKEYDevice = async ({deviceId}) => {
    await delay()
    const response = await PROVIDER_GET(`devices/api-key/${deviceId}`)
    return response;
}

export const updateDevice = async ({deviceId , data}) => {
    await delay()
    const response = await PROVIDER_PUT(`devices/${deviceId}`,data)
    return response;
}

export const deleteDevice = async ({data}) => {
    await delay()
    const response = await PROVIDER_GET(`devices/`,data)
    return response;
}