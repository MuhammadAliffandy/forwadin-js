import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAutoReplies = async ( token ) => {
    await delay()
    const response = await PROVIDER_GET(`auto-replies`,token)
    return response;
}

export const getAutoReply = async ( token , autoReplyId ) => {
    await delay()
    const response = await PROVIDER_GET(`auto-replies/${autoReplyId}`,token)
    return response;
}

export const getAutoReplyRecipients = async ( token , autoReplyId ) => {
    await delay()
    const response = await PROVIDER_GET(`auto-replies/${autoReplyId}/recipients`,token)
    return response;
}

export const createAutoReply = async ( token , data ) => {
    await delay()
    const response = await PROVIDER_POST(`auto-replies`, data , token )
    return response;
}

export const updateAutoReply = async ( token , autoReplyId  , data ) => {
    await delay()
    const response = await PROVIDER_PUT(`auto-replies/${autoReplyId}`, data , token )
    return response;
}

export const updateAutoReplyStatus = async ( token , autoReplyId  , data ) => {
    await delay()
    const response = await PROVIDER_PATCH(`auto-replies/${autoReplyId}`, data , token )
    return response;
}

export const deleteAutoReplies = async ( token , data ) => {
    await delay()
    const response = await PROVIDER_DELETE(`auto-replies`, data , token )
    return response;
}