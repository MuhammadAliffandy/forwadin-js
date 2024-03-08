const sampleContact = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    colorCode: 'ffff',
    email: 'johnDoe@gmail.com',
    gender: 'male',
    phoneNumber: '0123456789',
    country: 'Indonesia',
    dob: '10/10/2000',
    createdAt: '',
    updatedAt: ''
}
const sampleCampaign = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    colorCode: 'ffff',
    email: 'johnDoe@gmail.com',
    gender: 'male',
    phoneNumber: '0123456789',
    country: 'Indonesia',
    dob: '10/10/2000',
    createdAt: '',
    updatedAt: '',
    registrationSyntax: 'REGIS123',
    unregistrationSyntax: 'UNREG123',
    campaignName: ''
}
const listVariables = [
    'firstName',
    'lastName',
    'phoneNumber',
    'email'
]
const listVariablesCampaign = [
    'firstName',
    'lastName',
    'phoneNumber',
    'email',
    'registrationSyntax',
    'unregistrationSyntax',
    'campaignName'
]
export const parseTextInput = (text: string, isCampaign = false) => {
    if (!isCampaign) {
        return text.replace(/\{\{\$(\w+)}}/g, (match, placeholder) => {
            // @ts-ignore
            return sampleContact[placeholder] || match;
        });
    }
    return text.replace(/\{\{\$(\w+)}}/g, (match, placeholder) => {
        // @ts-ignore
        return sampleCampaign[placeholder] || match;
    });
}
export const getMessageVariables = (isCampaign = false) => {
    if (!isCampaign) {
        return listVariables
    }
    return listVariablesCampaign
}
