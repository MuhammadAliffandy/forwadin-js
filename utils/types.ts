

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
    contactDevices: {
        device: {
            name: string,
            id: string
        }
    }[],
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
    mediaPath?: string,
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
export interface GetMessage<T> {
    data: T[],
    metadata: {
        totalMessages: number,
        currentPage: number,
        totalPages: number,
        hasMore: boolean
    }
}

export interface ConversationMessage {
    pkId: number,
    id: string,
    message: string,
    mediaPath?: string,
    receivedAt: string,
    createdAt: string,
    updatedAt: string,
    sessionId: string,
    status: string,
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

    pkId: number,
    id: string,
    to: string,
    message: string,
    mediaPath?: string,
    schedule: string,
    status: string,
    source: string,
    createdAt: string,
    updatedAt: string,
    sessionId: string,
    contact: {
        firstName: string,
        lastName: string,
        colorCode: string
    }
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
    pkId: number,
    id: string,
    name: string,
    recipients: string[]
    message: string,
    schedule: string,
    delay: number,
    isSent: boolean,
    deviceId: number,
    createdAt: string,
    updatedAt: string,
    device: DeviceData
}
export interface GetBroadcast {
    id: string,
    name: string,
    status: boolean,
    device: {
        name: string
    },
    recipients?: string[],
    schedule?: string,
    message?: string,
    createdAt: string,
    updatedAt: string
}

export interface OutgoingBroadcast {
    outgoingBroadcast: ContactBroadcast[]
}
export interface ContactBroadcast {
    pkId: number,
    id: string,
    message: string,
    mediaPath?: string,
    receivedAt: string,
    createdAt: string,
    updatedAt: string,
    sessionId: string,
    status: string,
    from?: string,
    to?: string,
    contactId: number,
    contact: ContactData
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

export interface SubscriptionTypes {
    pkId: number,
    startDate: string,
    endDate: string,
    autoReplyUsed: number,
    broadcastUsed: number,
    contactUsed: number,
    deviceUsed: number,
    autoReplyMax: number,
    broadcastMax: number,
    contactMax: number,
    deviceMax: number,
    subscriptionPlanId: number,
    userId: number,
    createdAt: string,
    updatedAt: string,
    subscriptionPlan: {
        name: string
    }
}
export interface DeviceSession {
    id: string,
    sessionId: string,
    name: string,
    phone: string,
}

export interface AutoReply {
    pkId: number,
    id: string,
    name: string,
    requests: string[],
    response: string,
    schedule: string,
    status: boolean,
    recipients: string[],
    createdAt: string,
    updatedAt: string,
    deviceId: string
}
export interface TagsType {
    active?: boolean,
    title: string,
    value: string
}

export type { UserRegisterData, MultipleCheckboxRef, CheckboxRef, DeviceData, Label, CountryCode, ContactData, MessageData, MediaMessageData, GroupData, IncomingMessage, OutgoingMessage, MultipleInputRef, ResetUserData, BroadcastData }

export interface GetCampaign {
    id: string,
    name: string,
    status: boolean,
    recipients: string[],
    registrationSyntax: string,
    device: {
        name: string
    },
    createdAt: string,
    updatedAt: string
}
export interface CampaignData {
    pkId: number,
    id: string,
    name: string,
    syntaxRegistration: string,
    registrationMessage: string,
    messageRegistered: string,
    recipients: string[],
    isSent: boolean,
    groupId: number,
    deviceId: number,
    createdAt: string,
    updatedAt: string
}