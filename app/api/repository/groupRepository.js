import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAllGroups = async (token) => {
    await delay()
    const response = await PROVIDER_GET(`groups`,token)
    return response;
}

export const getGroup = async ( token , groupId) => {
    await delay()
    const response = await PROVIDER_GET(`groups/${groupId}`,token)
    return response;
}

export const createGroup = async (token , data) => {
    await delay()
    const response = await PROVIDER_POST(`groups/create`, data , token )
    return response;
}

export const updateGroup = async (token , data) => {
    await delay()
    const response = await PROVIDER_PUT(`groups/${groupId}/update`,token , data)
    return response;
}

export const deleteGroup = async (token , data) => {
    await delay()
    const response = await PROVIDER_DELETE(`groups`,token , data)
    return response;
}

export const addMemberGroup = async (token , data) => {
    await delay()
    const response = await PROVIDER_POST(`groups/add`, data , token )
    return response;
}

export const deleteMemberGroup = async (token , data) => {
    await delay()
    const response = await PROVIDER_POST(`groups/remove`, data , token )
    return response;
}