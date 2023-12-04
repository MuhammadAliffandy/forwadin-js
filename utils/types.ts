

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
    createdAt: string,
    updatedAt: string,
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
    contact?: {
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
    createdAt: string,
    updatedAt: string,
    sessionId: string,
    status?: string,
    schedule?: string,
    from?: string,
    to?: string,
    contactId?: number,
    contact?: {
        firstName: string,
        lastName: string,
        colorCode: string,
        initial?: string
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
export interface MessageMetadata {
    totalMessages: number,
    currentPage: number,
    totalPages: number,
    hasMore: boolean
}

interface GroupData {
    pkId: number,
    id: string,
    name: string,
    type: string,
    membersCount: number,
    createdAt: string,
    updatedAt: string,
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
    mediaPath?: string,
    schedule: string,
    delay: number,
    isSent: boolean,
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
    mediaPath?: string,
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
    affiliationCode: string,
    emailVerifiedAt: string,
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
    mediaPath?: string,
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
    id: string,
    name: string,
    mediaPath?: string,
    schedule: string,
    recipients: string[],
    registrationMessage: string,
    registrationSyntax: string,
    unregistrationSyntax: string,
    successMessage: string,
    failedMessage: string,
    unregisteredMessage: string,
    device: {
        name: string
    }
}
export interface CampaignMessage {
    pkId: number,
    id: string,
    name: string,
    campaignId: number,
    message: string,
    mediaPath?: string,
    delay: number,
    isSent: boolean,
    schedule: string,
    createdAt: string,
    updatedAt: string
}
export interface CampaignMessageForm {
    name: string,
    campaignId: string,
    message: string,
    schedule: string,
    delay: number
}
export type MessageTypes = 'registrationMessage' | 'successMessage' | 'failedMessage' | 'unregisteredMessage'
export interface CampaignForm {
    name: string,
    deviceId: string,
    recipients: string[],
    registrationSyntax: string,
    unregistrationSyntax: string,
    registrationMessage: string,
    messageRegistered: string,
    messageFailed: string,
    messageUnregistered: string,
    delay: number, // in miliseconds
    schedule: string
}
export interface BroadcastForm {
    name: string,
    deviceId: string,
    recipients: string[],
    message: string, // limit 255
    delay: number,
    schedule: string
}
export type MessageTableStatus = 'Terkirim' | 'Diterima' | 'Terbaca' | 'Balasan'
export interface CustomerService {
    pkId: number,
    id: string,
    username: string,
    email: string,
    password: string,
    refreshToken: string,
    deletedAt: string | null,
    createdAt: string,
    updatedAt: string,
    userId: number,
    deviceId: number,
    device: {
        id: string,
    },
    privilegeId: 222,
    user: {
        id: string,
        firstName: string,
        lastName: string
    }
}

export interface BusinessHours {
    pkId: number,
    id: string,
    message: string,
    monStart: number,
    monEnd: number,
    tueStart: number,
    tueEnd: number,
    wedStart: number,
    wedEnd: number,
    thuStart: number,
    thuEnd: number,
    friStart: number,
    friEnd: number,
    satStart: number,
    satEnd: number,
    sunStart: number,
    sunEnd: number,
    timeZone: string,
    deviceId: number
}
export interface MessageTemplate {
    pkId: number,
    id: string,
    name: string,
    message: string,
    userId: number,
    createdAt: string,
    updatedAt: string
}
export interface SessionProfile {
    device: {
        name: string,
        phone: string,
        sessions: [
            {
                sessionId: string
            }
        ]
    },
    profileName: string,
    presence: string,
    status: string,
    address: string
}
export interface CSProfile {
    pkId: number,
    id: string,
    username: string,
    email: string,
    password: string,
    refreshToken: string,
    deletedAt: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
    deviceId: number,
    privilegeId: 222
}