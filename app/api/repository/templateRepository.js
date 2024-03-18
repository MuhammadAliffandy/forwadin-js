import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const createTemplates = async (token ,data ) => {
    await delay()
    const response = await PROVIDER_POST(`templates`, data ,token)
    return response;
}

export const getTemplates = async (token ) => {
    await delay()
    const response = await PROVIDER_GET(`templates`,token)
    return response;
}

export const deleteTemplates = async (token ) => {
    await delay()
    const response = await PROVIDER_DELETE(`templates`,token)
    return response;
}

