import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const createBroadcast = async ( token , data ) => {
    await delay()
    const response = await PROVIDER_POST(`broadcasts`, data , token , 'form' )
    return response;
}

export const getBroadcast = async ( token  ) => {
    await delay()
    const response = await PROVIDER_GET(`broadcasts` , token )
    return response;
}

export const getBroadcastDetail = async ( token , broadcastId ) => {
    await delay()
    const response = await PROVIDER_GET(`broadcasts/${broadcastId}` , token )
    return response;
}

export const getOutgoingBroadcasts = async ( token , broadcastId ) => {
    await delay()
    const response = await PROVIDER_GET(`broadcasts/${broadcastId}/outgoing` , token )
    return response;
}

export const getOutgoingBroadcastsByQuery = async ( token , broadcastId , customQuery ) => {
    await delay()
    const response = await PROVIDER_GET(`broadcasts/${broadcastId}/outgoing${customQuery}` , token )
    return response;
}

export const getOutgoingReplies = async ( token , broadcastId ) => {
    await delay()
    const response = await PROVIDER_GET(`broadcasts/${broadcastId}/replies` , token )
    return response;
}

export const updateBroadcast = async ( token , broadcastId , data ) => {
    await delay()
    const response = await PROVIDER_PUT(`broadcasts/${broadcastId}` , data , token , 'form')
    return response;
}

export const deleteBroadcast = async ( token , data ) => {
    await delay()
    const response = await PROVIDER_DELETE(`broadcasts/`, data , token )
    return response;
}

export const updateBroadcastStatus = async ( token , broadcastId , data ) => {
    await delay()
    const response = await PROVIDER_PUT(`broadcasts/${broadcastId}/status` , token , data )
    return response;
}
