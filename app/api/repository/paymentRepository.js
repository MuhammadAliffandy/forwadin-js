import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const createPayment = async (token ,data ) => {
    await delay()
    const response = await PROVIDER_POST(`payment/pay`, data ,token)
    return response;
}

export const getPaymentSubscription = async (token, ) => {
    await delay()
    const response = await PROVIDER_GET(`payment/subscription`,token)
    return response;
}


