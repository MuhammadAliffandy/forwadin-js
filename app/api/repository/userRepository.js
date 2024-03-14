import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const userProfile = async ({ userId }) => {
    await delay()
    const response = await PROVIDER_GET(`users/${userId}`)
    return response;
}

export const profileUser = async () => {
    await delay()
    const response = await PROVIDER_GET(`users/subscription`)
    return response;
}

export const customerServicesUser = async ({ userId}) => {
    await delay()
    const response = await PROVIDER_GET(`users/customer-services/${userId}`)
    return response;
}

export const updateProfileUser = async ({ userId ,data}) => {
    await delay()
    const response = await PROVIDER_PUT(`users/${userId}`,data)
    return response;
}

export const changeEmailUser = async ({ userId ,data}) => {
    await delay()
    const response = await PROVIDER_PUT(`users/change-email/${userId}`,data)
    return response;
}
export const changePasswordUser = async ({ userId ,data}) => {
    await delay()
    const response = await PROVIDER_PUT(`users/change-password/${userId}`,data)
    return response;
}