
const templateHeaders = {
    token: {
        name: 'Authorization',
        description: '',
        value: 'Bearer ACCESS_TOKEN'
    },
    formdata: {
        name: 'Content-Type',
        description: '',
        value: 'multipart/form-data'
    },
    appJSON: {
        name: 'Content-Type',
        description: '',
        value: 'application/json'
    },
    XHeader: {
        name: 'X-Forwardin-Key',
        description: 'copy and paste from your forwardin account setting',
        value: 'KEY'
    }
}
const bothTokenHeader = [
    templateHeaders.token,
    templateHeaders.XHeader
]
const templatePathVariable = {
    session: {
        name: 'sessionId',
        description: 'obtained by sending request to get all sessions path'
    },
    device: {
        name: 'deviceId',
        description: ''
    },
    userId: {
        name: 'userId',
        description: 'get from login'
    }
}

const allApiData: AllApiDataTypes[] = [
    {
        group: 'Authentication',
        apiList: [
            {
                name: 'Register',
                url: '/auth/register',
                method: 'POST',
                headers: [templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        username: "usertest",
                        phone: "628886945389",
                        email: "usertest@example.com",
                        password: "111Pass!",
                        confirmPassword: "111Pass!"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imloc2FudWwyMDAxQGdtYWlsLmNvbSIsImlhdCI6MTcwMzk4OTA4NCwiZXhwIjoxNzAzOTg5OTg0fQ.JGpGTAzw5wBpRhhwBgOLN6zWgTJD7rpZG-ufTuLe3d8", refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzYjg2YjNhLThlNDktNGUyOS05NDVhLWI0OTBlMjNhMmZkYyIsImlhdCI6MTcwMzk4OTA4NCwiZXhwIjoxNzA0NTkzODg0fQ.SYMyNjvqlSXstJuyD_fX-TOStIlcXhZiwfGRixUmJFs",
                            id: "a904eea5-a14f-4775-893f-01d867a6c87d",
                            role: 111
                        },
                        status: 200
                    },
                    {
                        response: {
                            message: "User with this username, email, or phone already exists"
                        },
                        status: 400
                    },
                ]
            },
            {
                name: 'Login',
                url: '/auth/login',
                method: 'POST',
                headers: [templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        identifier: "sample@example.com or sampleUsername",
                        password: "samplePassword"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imloc2FudWwyMDAxQGdtYWlsLmNvbSIsImlhdCI6MTcwMzk4OTA4NCwiZXhwIjoxNzAzOTg5OTg0fQ.JGpGTAzw5wBpRhhwBgOLN6zWgTJD7rpZG-ufTuLe3d8", refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzYjg2YjNhLThlNDktNGUyOS05NDVhLWI0OTBlMjNhMmZkYyIsImlhdCI6MTcwMzk4OTA4NCwiZXhwIjoxNzA0NTkzODg0fQ.SYMyNjvqlSXstJuyD_fX-TOStIlcXhZiwfGRixUmJFs",
                            id: "23b86b3a-8e49-4e29-945a-b490e23a2fdc",
                            role: 111
                        },
                        status: 200
                    },
                    {
                        response: {
                            message: "Account not found or has been deleted"
                        },
                        status: 401
                    },
                    {
                        response: {
                            "message": "Wrong password"
                        },
                        status: 401
                    },
                ]
            },
            {
                name: 'Send Verification Email',
                url: '/auth/send-verification-email',
                method: 'POST',
                headers: [templateHeaders.appJSON, templateHeaders.token],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            message: "Verification email sent successfully",
                            otpToken: "******"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Verify Email',
                url: '/auth/verify-email',
                method: 'POST',
                headers: [templateHeaders.appJSON, templateHeaders.token],
                type: 'json',
                jsonSampleRequests: [{
                    otpToken: "******"
                }],
                sampleResponses: [
                    {
                        response: {
                            message: "Email verification successful"
                        },
                        status: 200
                    },
                    {
                        response: {
                            message: "Invalid OTP token"
                        },
                        status: 401
                    },
                ]
            },
            {
                name: 'Google OAUTH',
                url: '/auth/google',
                method: 'POST',
                headers: [templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    { accessToken: "ya29.a0AfB_byCCTMMdfzU5_4OsKn86xF8fswTlnHzR4u42u-UN0HS3OUueDBtvZdvubJz0MKn5lLSMiKa-BORvY1Ga-kIkStSbb6LHsq5VO3zZedlWpNxs5A99VnWv5xQ6H55yAk9IR0cEMAVpaZpWz75fMP-DW-nmBCuL9OVtaCgYKAVESARESFQGOcNnC5TDXHuHa3BFJYkB8PJbKGA0171" }
                ],
                sampleResponses: [
                    {
                        response: {
                            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imloc2FudWwyMDAxQGdtYWlsLmNvbSIsImlhdCI6MTcwMzk4OTA4NCwiZXhwIjoxNzAzOTg5OTg0fQ.JGpGTAzw5wBpRhhwBgOLN6zWgTJD7rpZG-ufTuLe3d8", refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzYjg2YjNhLThlNDktNGUyOS05NDVhLWI0OTBlMjNhMmZkYyIsImlhdCI6MTcwMzk4OTA4NCwiZXhwIjoxNzA0NTkzODg0fQ.SYMyNjvqlSXstJuyD_fX-TOStIlcXhZiwfGRixUmJFs",
                            id: "23b86b3a-8e49-4e29-945a-b490e23a2fdc",
                            role: 111
                        },
                        status: 200
                    }
                ]
            },
            {
                name: 'Refresh Token',
                url: '/auth/refresh-token',
                method: 'POST',
                headers: [],
                type: 'json',
                jsonSampleRequests: [
                    {
                        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWI4MDFkLWU3asdasDc4Ny04NzQ2LTc4YzRiYzlhZDI1NiIsImlhdCI6MTcwMjg5MjAzMSwiZXhwIadagjoNDk2ODMxfQ.m4QHwtuZzqCyORBXA-qlJzNJvVl5lUqanNhrjafNfVs"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imloc2wasdyMDAxQGdtYWlsLmNvbSIsImlhdCI6MTcwMzk5Nzg2NSwiZXhwIjoxNzAzOTk4NzY1fQ.IHjVq0I4Vv1QHr6lsasdkuwe1ddMJGhK3Xvo_GmhA3XY",
                            id: "23b86b3a-8e49-4e29-945a-b490e23a2fdc"
                        },
                        status: 200
                    },
                    {
                        response: {
                            message: "Invalid refresh token"
                        },
                        status: 401
                    },
                ]
            },
            {
                name: 'Forgot Password',
                url: '/auth/forgot-password',
                method: 'POST',
                headers: [],
                type: 'json',
                jsonSampleRequests: [
                    {
                        email: "email@example.com"
                    },
                ],
                sampleResponses: [
                    {
                        response: {
                            message: "Password reset email sent"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Reset Password',
                url: '/auth/reset-password',
                method: 'POST',
                headers: [],
                type: 'json',
                jsonSampleRequests: [
                    {
                        resetToken: "IZCEISBEO43XE6CLNAYU2KKJKSKHEZZZFIVE2TB2MZ3UOTJXJZRQ",
                        password: "123Pass!"
                    },
                ],
                sampleResponses: [
                    {
                        response: {
                            message: "Password reset successful"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Check Identifier Availability',
                url: '/auth/check-identifier-availability',
                method: 'POST',
                headers: [...bothTokenHeader],
                type: 'json',
                jsonSampleRequests: [
                    {
                        email: "validuser@example.com"
                    },
                    {
                        phone: "6287849952400"
                    },
                    {
                        username: "username"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            message: "Email is available"
                        },
                        status: 200
                    },
                    {
                        response: {
                            message: "Phone number is already taken"
                        },
                        status: 400
                    },
                    {
                        response: {
                            message: "Username is already taken"
                        },
                        status: 400
                    },
                ]
            },
        ]
    },
    {
        group: 'User',
        apiList: [
            {
                name: 'Get User Profile',
                url: '/users/:userId',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                pathVariables: [templatePathVariable.userId],
                sampleResponses: [
                    {
                        response: {
                            firstName: "Sample",
                            lastName: "",
                            username: "username",
                            phone: null,
                            email: "example@example.com",
                            accountApiKey: null,
                            googleId: "********",
                            affiliationCode: "kjdsf8",
                            emailVerifiedAt: "2023-11-27T00:07:23.643Z"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get User Profil',
                url: '/users/subscription',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "pkId": 3,
                            "startDate": "2023-10-27T15:42:53.000Z",
                            "endDate": "2024-10-27T15:42:53.000Z",
                            "autoReplyUsed": 0,
                            "broadcastUsed": 0,
                            "contactUsed": 0,
                            "deviceUsed": 0,
                            "autoReplyMax": 4500,
                            "broadcastMax": 2500,
                            "contactMax": 1000,
                            "deviceMax": 15,
                            "subscriptionPlanId": 2,
                            "userId": 2,
                            "createdAt": "2023-10-27T08:42:57.959Z",
                            "updatedAt": "2023-10-27T08:42:57.959Z",
                            "subscriptionPlan": {
                                "name": "basic"
                            }
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get User Customer Services',
                url: '/users/customer-services/:userId',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                pathVariables: [templatePathVariable.userId],
                sampleResponses: [
                    {
                        response: [
                            {
                                "pkId": 3,
                                "id": "d294caf5-f8e4-4d2c-86cd-309dc1f2454d",
                                "username": "ayamgeprek",
                                "email": "ayam@geprek",
                                "password": "$2b$10$1DeWY9I4U6kchca5aImN4.0Zkzln1foivUOsYyxFSiVJk6pSOmu4m",
                                "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyOTRjYWY1LWY4ZTQtNGQyYy04NmNkLTMwOWRjMWYyNDU0ZCIsImlhdCI6MTcwMTI0MDY0OCwiZXhwIjoxNzAxODQ1NDQ4fQ.RpNbAsQ5btkn8rfAvoLHcHYh3G7BZIAaSDCbB0KeQuI",
                                "deletedAt": null,
                                "createdAt": "2023-11-29T06:50:48.354Z",
                                "updatedAt": "2023-11-29T06:50:48.354Z",
                                "userId": 1,
                                "deviceId": 1,
                                "privilegeId": 222,
                                "device": {
                                    "id": "7128c383-bf1b-4f97-aac8-3e808a344fc2"
                                }
                            }
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Update User Profile',
                url: '/users/:userId',
                method: 'PATCH',
                headers: [...bothTokenHeader],
                type: 'json',
                pathVariables: [templatePathVariable.userId],
                jsonSampleRequests: [{
                    "firstName": "sample",
                    "lastName": "sample",
                    "username": "newUsername"
                }],
                sampleResponses: [
                    {
                        response: {
                            "message": "User profile updated successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Change Email',
                url: '/users/change-email/:userId',
                method: 'PATCH',
                headers: [templateHeaders.token],
                type: 'json',
                pathVariables: [templatePathVariable.userId],
                jsonSampleRequests: [{
                    email: 'newEmail@example.com'
                }],
                sampleResponses: [
                    {
                        response: {
                            "message": "Email updated successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Change Phone Number',
                url: '/users/change-email/:userId',
                method: 'PATCH',
                headers: [templateHeaders.token],
                type: 'json',
                pathVariables: [templatePathVariable.userId],
                jsonSampleRequests: [{
                    email: 'newEmail@example.com'
                }],
                sampleResponses: [
                    {
                        response: {
                            "message": "Email updated successfully"
                        },
                        status: 200
                    },
                ]
            },
        ]
    },
]
export interface AllApiDataTypes {
    group: string,
    apiList: ApiDataTypes[]
}
export interface TemplateHeaderTypes {
    [key: string]: HeaderTypes
}
export interface templatePathVariableTypes {
    [key: string]: PathVariableTypes
}
export interface ApiDataTypes {
    name: string,
    url: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
    pathVariables?: PathVariableTypes[],
    headers: HeaderTypes[],
    type: 'formdata' | 'json' | 'none',
    jsonSampleRequests?: Object[],
    sampleResponses: SampleResponseType[],
    formDataSampleRequests?: {
        key: string,
        value: string
    }[]
}
interface HeaderTypes {
    name: string,
    description: string,
    value: string
}
interface PathVariableTypes {
    name: string,
    description: string
}
interface SampleResponseType {
    response: any,
    status: number
}

export { allApiData }