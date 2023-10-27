interface UserRegisterData {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    phone: string,
    password: string,
    confirmPassword: string,
    otp?: string
}
interface ResetUserData {
    email: string,
    otp: string,
    password: string,
    confirmPassword: string
}
interface MultipleCheckboxRef {
    [key: string]: { checked: boolean }
}
interface MultipleInputRef {
    [key: string]: HTMLInputElement
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
interface DetailContactGroup {
    group: {
        name: string
    }
}
interface ContactData {
    id: string,
    phone: string,
    firstName: string,
    lastName: string,
    initial?: string,
    colorCode: string,
    gender: string,
    honorific?: string,
    country?: string,
    dob?: string,
    ContactLabel?: Label[],
    contactGroups?: DetailContactGroup[],
    email: string,
    device?: string,
    createdAt: string,
    updatedAt: string,
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
    pkId: number,
    id: string,
    from: string,

    message: string,
    receivedAt: string,
    createdAt: string,
    updatedAt: string,
    sessionId: string,
    contact: {
        firstName: string,
        lastName: string,
        colorCode: string,
        initial: string
    },
    checked?: boolean
}
export interface ConversationMessage {
    pkId: number,
    id: string,
    message: string,
    receivedAt: string,
    createdAt: string,
    updatedAt: string,
    sessionId: string,
    status: number,
    from?: string,
    to?: string,
    contact: {
        firstName: string,
        lastName: string,
        colorCode: string,
        initial: string
    },
    checked?: boolean
}
interface OutgoingMessage {
    id: string,
    to: string,
    message: string,
    contact: ContactData,
    status: string,
    created_at: string,
    updated_at: string,
    source: string,
    type: string,
    checked?: boolean
}
interface GroupData {
    pkId: number,
    id: string,
    name: string,
    isCampaign: boolean,
    membersCount: number,
    contactGroups?: ContactGroup[],
    userId: string,
    checked?: boolean
}
export interface ContactGroup {
    pkId: number,
    id: string,
    contactId: number,
    groupId: number,
    contact: ContactData
}
interface BroadcastData {
    id: string,
    name: string,
    status: string,
    sent: number,
    received: number,
    read: number,
    reply: number,
    device: DeviceData,
    created_at: string,
    updated_at: string,
    checked?: boolean
}
export interface UserProfile {
    firstName: string,
    lastName: string,
    username: string,
    phone: string,
    email: string,
    accountApiKey: string,
    affiliationCode: string
}
export type { UserRegisterData, MultipleCheckboxRef, CheckboxRef, DeviceData, Label, CountryCode, ContactData, MessageData, MediaMessageData, GroupData, IncomingMessage, OutgoingMessage, MultipleInputRef, ResetUserData, BroadcastData }
