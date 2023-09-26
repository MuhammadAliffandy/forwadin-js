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
    id: number,
    phone: string,
    firstName: string,
    lastName: string,
    gender: string,
    honorific?: string,
    country?: string,
    birthDate?: string,
    label: string[],
    email: string,
    created_at: string,
    checked: boolean
}
export type { UserRegisterData, MultipleCheckboxRef, CheckboxRef, DeviceData, Label, CountryCode, ContactData }
