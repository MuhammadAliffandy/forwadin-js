import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getIncomeMessages = async ( token , sessionId) => {
    await delay()
    const response = await PROVIDER_GET(`messages/${sessionId}/incoming`,token)
    return response;
}

export const getIncomeMessagesByQuery = async ( token , sessionId , customQuery) => {
    await delay()
    const response = await PROVIDER_GET(`messages/${sessionId}/incoming${customQuery}`,token)
    return response;
}

export const getOutgoingMessages = async ( token , sessionId) => {
    await delay()
    const response = await PROVIDER_GET(`messages/${sessionId}/outgoing`,token)
    return response;
}
export const getOutgoingMessagesByQuery = async ( token , sessionId , customQuery) => {
    await delay()
    const response = await PROVIDER_GET(`messages/${sessionId}/outgoing${customQuery}`,token)
    return response;
}

export const getConversationMessages = async ( token , sessionId) => {
    await delay()
    const response = await PROVIDER_GET(`messages/${sessionId}`,token)
    return response;
}

export const getListMessenger = async ( token , sessionId) => {
    await delay()
    const response = await PROVIDER_GET(`messages/${sessionId}/list`,token)
    return response;
}

export const getListMessenger2 = async ( token , sessionId) => {
    await delay()
    const response = await PROVIDER_GET(`messages/${sessionId}/messenger-list`,token)
    return response;
}

export const sendMessages = async ( token , sessionId , data ) => {
    await delay()
    const response = await PROVIDER_POST(`messages/${sessionId}/send`, data , token)
    return response;
}

export const sendMessagesMedia = async ( token ,data ) => {
    await delay()
    const response = await PROVIDER_POST(`messages/send`, data , token)
    return response;
}

export const sendImageMessages = async ( token , sessionId , data ) => {
    await delay()
    const response = await PROVIDER_POST(`messages/${sessionId}/send/image`, data , token)
    return response;
}
export const sendDocumentMessages = async ( token , sessionId , data ) => {
    await delay()
    const response = await PROVIDER_POST(`messages/${sessionId}/send/doc`, data , token)
    return response;
}
