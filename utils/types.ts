interface UserRegisterData {
    email: string,
    username: string,
    phone: string,
    password: string,
    confirmPassword: string,
    otp?: string
}
interface MultipleCheckboxRef {
    [key: string]: { checked: boolean }
}
interface CheckboxRef {
    checked: boolean
}
interface DeviceData {
    id: number,
    name: string,
    apiKey: string,
    label: string[],
    status: number,
    checked: boolean
}[]
interface Label {
    name: string,
    active: boolean
}
interface CountryCode {
    name: string,
    dial_code: string,
    code: string,
    flag: string
}
interface ContactData {
    id: string,
    phone: string,
    firstName: string,
    lastName: string,
    initial: string,
    profileColor: string,
    gender: string,
    honorific?: string,
    country?: string,
    birthDate?: string,
    label: string[],
    email: string,
    created_at: string,
    checked?: boolean,
    active?: boolean
}
interface MessageData {
    id: string,
    from: string,
    message: string,
    received_at: string,
    created_at: string
    updated_at: string
}
interface MediaMessageData {
    id: string,
    fileTitle: string,
    path: string,
    from: string,
    size: string,
    created_at: string,
    checked?: boolean
}
interface GroupData {
    id: string,
    name: string,
    type: string,
    totalUser: number,
    users: ContactData[],
    created_at: string,
    updated_at: string,
    checked?: boolean
}
export type { UserRegisterData, MultipleCheckboxRef, CheckboxRef, DeviceData, Label, CountryCode, ContactData, MessageData, MediaMessageData, GroupData }
