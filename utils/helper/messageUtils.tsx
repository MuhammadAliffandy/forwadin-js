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
const listVariables = [
    'firstName',
    'lastName',
    'phoneNumber',
    'email'
]
export const parseTextInput = (text: string) => {
    return text.replace(/\{\{\$(\w+)}}/g, (match, placeholder) => {
        // @ts-ignore
        return sampleContact[placeholder] || match;
    });
}
export const getMessageVariables = () => {
    return listVariables
}