import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const createBusinessHours = async ( token , data ) => {
    await delay()
    const response = await PROVIDER_POST(`business-hours`, data , token )
    return response;
}

export const updateBusinessHours = async ( token , data ) => {
    await delay()
    const response = await PROVIDER_PUT(`business-hours`, data , token )
    return response;
}

export const getBusinessHours = async ( token , deviceId) => {
    await delay()
    const response = await PROVIDER_GET(`business-hours/${deviceId}`, token )
    return response;
}
        