import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getUserProfile = async ( token , userId) => {
    await delay()
    const response = await PROVIDER_GET(`users/${userId}`,token )
    return response;
}

export const profileUser = async (token) => {
    await delay()
    const response = await PROVIDER_GET(`users/subscription`,token)
    return response;
}

export const getUserSubscriptionById = async (token , userId) => {
    await delay()
    const response = await PROVIDER_GET(`users/${userId}/subscription`,token)
    return response;
}

export const customerServicesUser = async ( token , userId) => {
    await delay()
    const response = await PROVIDER_GET(`users/customer-services/${userId}`,token)
    return response;
}

export const updateProfileUser = async (token ,  userId ,data ) => {
    await delay()
    const response = await PROVIDER_PATCH(`users/${userId}`,data , token)
    return response;
}

export const changeEmailUser = async (token , userId ,data) => {
    await delay()
    const response = await PROVIDER_PATCH(`users/change-email/${userId}`,data , token)
    return response;
}

export const changePhoneNumberUser = async (token , userId ,data) => {
    await delay()
    const response = await PROVIDER_PATCH(`users/change-phone-number/${userId}`,data , token)
    return response;
}
export const changePasswordUser = async ( token ,data) => {
    await delay()
    const response = await PROVIDER_PUT(`users/change-password`,data , token)
    return response;
}

export const deleteUser = async ( token , userId) => {
    await delay()
    const response = await PROVIDER_PUT(`users/${userId}/delete`, token)
    return response;
}