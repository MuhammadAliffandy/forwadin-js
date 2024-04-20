import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAllUser = async (token ) => {
    await delay()
    const response = await PROVIDER_GET(`super-admin/users`,token)
    return response;
}

export const createUserAsSuperAdmin = async (token , data) => {
    await delay()
    const response = await PROVIDER_POST(`super-admin/user`,data ,token)
    return response;
}

export const editUserAsSuperAdmin = async (token ,userId , data) => {
    await delay()
    const response = await PROVIDER_PUT(`super-admin/users/${userId}`,data ,token)
    return response;
}

export const deleteUserAsSuperAdmin = async (token ,userId , data) => {
    await delay()
    const response = await PROVIDER_DELETE(`super-admin/users/${userId}`,data ,token)
    return response;
}