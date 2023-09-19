interface UserRegisterData {
    email: string,
    username: string,
    phone: string,
    password: string,
    confirmPassword: string,
    otp?: string
}
interface DeviceCheckboxRef {
    [key: string]: { checked: boolean }
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
export type { UserRegisterData, DeviceCheckboxRef, DeviceData, Label }
