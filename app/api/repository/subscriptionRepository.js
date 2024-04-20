import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAllSubscriptionPlans = async (token ) => {
    await delay()
    const response = await PROVIDER_GET(`subscription-plans`,token)
    return response;
}

export const createSubscriptionPlans = async (token ,data ) => {
    await delay()
    const response = await PROVIDER_POST(`subscription-plans`,data, token)
    return response;
}

export const editSubscriptionPlans = async (token , subscriptionId ,data ) => {
    await delay()
    const response = await PROVIDER_PUT(`subscription-plans/${subscriptionId}`,data, token)
    return response;
}

export const deleteSubscriptionPlans = async (token ,subscriptionId , data) => {
    await delay()
    const response = await PROVIDER_DELETE(`subscription-plans/${subscriptionId}`,data ,token)
    return response;
}