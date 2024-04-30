import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getNotification = async ( token , userId ,  ) => {
    await delay()
    const response = await PROVIDER_GET(`users/${userId}/notifications` , token )
    return response;
}