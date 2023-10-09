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
    pkId: number
    id: string,
    name: string,
    phone?: string,
    apiKey: string,
    serverId: number,
    status: string,
    created_at: string,
    updated_at: string,
    businessHourId?: number,
    userId: number,
    DeviceLabel: Label[],
    checked?: boolean
}
interface Label {
    label: {
        name: string,
        active?: boolean
    }
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
    type: string,
    created_at: string,
    checked?: boolean
}
interface IncomingMessage {
    id: string,
    from: string,
    message: string,
    received_at: string,
    created_at: string,
    updated_at: string,
}
interface OutgoingMessage {
    id: string,
    to: string,
    message: string,
    status: string,
    created_at: string,
    updated_at: string,
    source: string
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
export type { UserRegisterData, MultipleCheckboxRef, CheckboxRef, DeviceData, Label, CountryCode, ContactData, MessageData, MediaMessageData, GroupData, IncomingMessage, OutgoingMessage }
