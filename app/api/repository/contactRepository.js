import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAllContacts = async (token) => {
    await delay()
    const response = await PROVIDER_GET(`contacts`,token)
    return response;
}

export const getAllContactsLabels = async (token) => {
    await delay()
    const response = await PROVIDER_GET(`contacts/labels`,token)
    return response;
}

export const getContacts = async (token , contactId) => {
    await delay()
    const response = await PROVIDER_GET(`contacts/${contactId}`, token)
    return response;
}

export const createContacts = async (token , data) => {
    await delay()
    const response = await PROVIDER_POST(`contacts/create`,data , token)
    return response;
}

export const importContacts = async (token , data) => {
    await delay()
    const response = await PROVIDER_POST(`contacts/import`,data , token)
    return response;
}

export const syncGoogleContacts = async (token , data) => {
    await delay()
    const response = await PROVIDER_POST(`contacts/sync-google`, data , token)
    return response;
}

export const updateContacts = async (token , contactId , data) => {
    await delay()
    const response = await PROVIDER_PUT(`contacts/${contactId}`, data , token)
    return response;
}

export const deleteContacts = async (token , data) => {
    await delay()
    const response = await PROVIDER_DELETE(`contacts`, data , token)
    return response;
}

export const addContactsToGroup = async (token , data) => {
    await delay()
    const response = await PROVIDER_POST(`contacts`, data , token)
    return response;
}
