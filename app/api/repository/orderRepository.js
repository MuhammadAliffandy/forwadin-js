import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const createOrders = async ( token , data ) => {
    await delay()
    const response = await PROVIDER_POST(`orders`, data , token )
    return response;
}