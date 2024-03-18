import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const createCampaigns = async ( token , data ) => {
    await delay()
    const response = await PROVIDER_POST(`campaigns`, data , token )
    return response;
}

export const getCampaigns= async ( token  ) => {
    await delay()
    const response = await PROVIDER_GET(`campaigns` , token )
    return response;
}

export const getCampaignDetail = async ( token , campaignId ) => {
    await delay()
    const response = await PROVIDER_GET(`campaigns/${campaignId}` , token )
    return response;
}

export const getOutgoingCampaign = async ( token , campaignId ) => {
    await delay()
    const response = await PROVIDER_GET(`campaigns/${campaignId}/outgoing` , token )
    return response;
}

export const getCampaignReplies = async ( token , campaignId ) => {
    await delay()
    const response = await PROVIDER_GET(`campaigns/${campaignId}/replies` , token )
    return response;
}

export const updateCampaign = async ( token , campaignId , data ) => {
    await delay()
    const response = await PROVIDER_PUT(`campaigns/${campaignId}` , data ,token )
    return response;
}

export const deleteCampaign = async ( token, data ) => {
    await delay()
    const response = await PROVIDER_PUT(`campaigns` , data ,token )
    return response;
}

export const updateCampaignStatus = async ( token , campaignId , data ) => {
    await delay()
    const response = await PROVIDER_PATCH(`campaigns/${campaignId}/status` , data ,token )
    return response;
}

export const createCampaignMessages = async ( token, data ) => {
    await delay()
    const response = await PROVIDER_POST(`campaigns/messages` , data ,token )
    return response;
}

export const updateCampaignMessages = async ( token , campaignMessageId , data ) => {
    await delay()
    const response = await PROVIDER_PUT(`campaigns/messages/${campaignMessageId}` , data ,token )
    return response;
}

export const getCampaignsMessages= async ( token , campaignId ) => {
    await delay()
    const response = await PROVIDER_GET(`campaigns/${campaignId}/messages` , token )
    return response;
}

export const getCampaignsMessagesDetail = async ( token , campaignId  , campaignMessageId ) => {
    await delay()
    const response = await PROVIDER_GET(`campaigns/${campaignId}/messages/${campaignMessageId}` , token )
    return response;
}

export const getOutgoingCampaignsMessages = async ( token , campaignId  , campaignMessageId ) => {
    await delay()
    const response = await PROVIDER_GET(`campaigns/${campaignId}/messages/${campaignMessageId}/outgoing` , token )
    return response;
}

export const getCampaignsMessagesReplies = async ( token , campaignId  , campaignMessageId ) => {
    await delay()
    const response = await PROVIDER_GET(`campaigns/${campaignId}/messages/${campaignMessageId}/replies` , token )
    return response;
}

export const deleteCampaignMessages = async ( token, data ) => {
    await delay()
    const response = await PROVIDER_DELETE(`campaigns/messages` , data ,token )
    return response;
}

export const updateCampaignMessagesStatus = async ( token , campaignMessageId , data ) => {
    await delay()
    const response = await PROVIDER_PATCH(`campaigns/messages/${campaignMessageId}/status` , data ,token )
    return response;
}