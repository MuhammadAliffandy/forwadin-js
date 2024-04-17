import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAllOrders = async ( token  ) => {
    await delay()
    const response = await PROVIDER_GET(`orders`, token )
    return response;
}

export const createOrders = async ( token , data ) => {
    await delay()
    const response = await PROVIDER_POST(`orders`, data , token )
    return response;
}

export const getOrderMessages = async ( token) => {
    await delay()
    const response = await PROVIDER_GET(`orders/messages` , token )
    return response;
}

export const createOrderMessages = async ( token,  data ) => {
    await delay()
    const response = await PROVIDER_POST(`orders/messages` , data ,  token )
    return response;
}
export const updateOrderMessages = async ( token, orderMessageId , data ) => {
    await delay()
    const response = await PROVIDER_PUT(`orders/messages/${orderMessageId}` , data ,  token )
    return response;
}
