import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAllUser = async (token ) => {
    await delay()
    const response = await PROVIDER_GET(`super-admin/users`,token)
    return response;
}
