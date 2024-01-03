import { m } from "framer-motion"

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
    },
    contact: {
        name: 'contactId',
        description: ''
    },
    group: {
        name: "groupId",
        description: ''
    },
    autoReply: {
        name: 'autoReplyId',
        description: ''
    },
    broadcast: {
        name: 'broadcastId',
        description: ''
    },
    campaign: {
        name: 'campaignId',
        description: ''
    },
    messageCP: {
        name: 'campaignMessageId',
        description: ''
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
                headers: [templateHeaders.appJSON],
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
                    phoneNumber: '628********'
                }],
                sampleResponses: [
                    {
                        response: {
                            "message": "Phone number updated successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Change Password',
                url: '/auth/change-password',
                method: 'PUT',
                headers: [templateHeaders.token],
                type: 'json',
                jsonSampleRequests: [{
                    "currentPassword": "111Pass!",
                    "password": "125Pass!",
                    "confirmPassword": "125Pass!"
                }],
                sampleResponses: [
                    {
                        response: {
                            "message": "Password change successful"
                        },
                        status: 200
                    },
                ]
            },
        ]
    },
    {
        group: 'Device',
        apiList: [
            {
                name: 'Get All Device',
                url: '/devices',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            {
                                "pkId": 1,
                                "id": "6d3440f4-6d77-44f9-9f78-fa5b4238e456",
                                "name": "Device kotak",
                                "phone": null,
                                "apiKey": "35e72e72-a83a-47e3-a79c-126f25d35beb",
                                "serverId": 1,
                                "status": "NOT_CONNECTED",
                                "createdAt": "2023-10-03T04:40:36.895Z",
                                "updatedAt": "2023-10-03T04:40:36.895Z",
                                "businessHourId": null,
                                "userId": 1,
                                "DeviceLabel": [
                                    {
                                        "label": {
                                            "name": "operator"
                                        }
                                    },
                                    {
                                        "label": {
                                            "name": "7 bulan lebih 1"
                                        }
                                    }
                                ]
                            }
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Get All Device',
                url: '/devices/:deviceId',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [
                    templatePathVariable.device
                ],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "pkId": 1,
                            "id": "6d3440f4-6d77-44f9-9f78-fa5b4238e456",
                            "name": "Device kotak",
                            "phone": null,
                            "apiKey": "35e72e72-a83a-47e3-a79c-126f25d35beb",
                            "serverId": 1,
                            "status": "NOT_CONNECTED",
                            "createdAt": "2023-10-03T04:40:36.895Z",
                            "updatedAt": "2023-10-03T04:40:36.895Z",
                            "businessHourId": null,
                            "userId": 1,
                            "DeviceLabel": [
                                {
                                    "label": {
                                        "name": "operator"
                                    }
                                },
                                {
                                    "label": {
                                        "name": "7 bulan lebih 1"
                                    }
                                }
                            ]
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get All Device Labels',
                url: '/devices/labels',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            "operator",
                            "pinjam dulu seratus",
                            "kita",
                            "bersama"
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Create Device',
                url: '/devices/create',
                method: 'POST',
                headers: [...bothTokenHeader],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "name": "Device 999",
                        "labels": ["operator", "pinjam dulu seratus"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Device created successfully",
                            "data": {
                                "pkId": 1,
                                "id": "1f9d390a-7348-4198-84d4-1d05448f0c84",
                                "name": "Device 999",
                                "phone": null,
                                "apiKey": "ae811a0b-a4d4-48e3-b173-29dd6d4f872b",
                                "serverId": 1,
                                "status": "DISCONNECTED",
                                "createdAt": "2023-10-16T07:04:19.974Z",
                                "updatedAt": "2023-10-16T07:04:19.974Z",
                                "businessHourId": null,
                                "userId": 1
                            }
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Generate API Key Device',
                url: '/devices/api-key/:deviceId',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [
                    templatePathVariable.device
                ],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "apiKey": "f9013703-a5b4-4a6a-ab95-2ebafebf2a6b"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Device',
                url: '/devices/:deviceId',
                method: 'PUT',
                headers: [...bothTokenHeader],
                pathVariables: [
                    templatePathVariable.device
                ],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "name": "CS loyal",
                        "labels": ["masuk"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Device updated successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Delete Devices',
                url: '/devices',
                method: 'DELETE',
                headers: [...bothTokenHeader],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "deviceIds": ["f3974bf0-1118-4754-bda0-aeb82b33213e", "038d1fc2-2776-4b78-a0e4-bf2dd41846d5", "8e22aea3-d701-4a73-ab30-7f0992bdef93"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Device deleted successfully"
                        },
                        status: 200
                    },
                ]
            },
        ]
    },
    {
        group: 'Session',
        apiList: [
            {
                name: 'Create Session',
                url: '/sessions/create',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "deviceId": "8a7b875f-4cf9-4ee9-a146-02f2eb9d19ea"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "qr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARQAAAEUCAYAAADqcMl5AAAAAklEQVR4AewaftIAABJLSURBVO3BQY4YybLgQDJR978yR0tfBZDIKKnfHzezP1hrrQse1lrrkoe11rrkYa21LnlYa61LHtZa65KHtda65GGttS55WGutSx7WWuuSh7XWuuRhrbUueVhrrUse1lrrkoe11rrkYa21LvnhI5W/qWJSOamYVE4qJpUvKiaVk4ovVE4q3lCZKiaVqWJSmSreUPmbKiaVLyomlZOKSeVvqvjiYa21LnlYa61LHtZa65IfLqu4SeWNipOKSWVSmSpOVKaKL1TeqDipOFF5Q+VEZaqYVG6qmFSmijdUpopJ5V+quEnlpoe11rrkYa21LnlYa61LfvhlKm9U3KQyVUwVk8qkclLxRsWk8kbFScUbFZPKScUXFZPKVDGp/CaVqeKk4kRlUvlNKm9U/KaHtda65GGttS55WGutS374H1fxhcpUMamcqHxR8YXKFxVTxRsqU8WJyhsVk8qkMlX8JpUvKiaV/0se1lrrkoe11rrkYa21Lvnhf5zKFxWTylQxqUwVb6h8oTJVTCpTxYnKb1KZKk5UpoqTii8qTlROKiaVE5Wp4v+Sh7XWuuRhrbUueVhrrUt++GUVv6liUnlDZaqYVE5UpopJ5UTlC5WbKt5QeUNlqpgqvlB5o+KNiknljYqbKv5LHtZa65KHtda65GGttS754TKVv0llqphUbqqYVN6omFSmikllqphUpopJZap4Q2Wq+KJiUpkqJpWpYlKZKiaVqWJSmSq+qJhUTlSmihOV/7KHtda65GGttS55WGutS374qOJfqviiYlI5UTlRmSomlanipGJSeaNiUnmj4jdVTCpTxRcVX1RMKlPFpDJVfFHxv+RhrbUueVhrrUse1lrrkh8+UpkqTlR+U8UXFScqU8WkMqm8oXJSMancpPKFylQxqbyhMlW8oTJVTBVfqEwVJypTxaQyVZyoTBWTyhsVXzystdYlD2utdcnDWmtd8sMvU5kqJpWp4kTlN6m8ofJGxaTyRcUbFZPKVDGpTBUnKpPKVDGpvKFyovKGyhcVk8obKicqJxWTyknFpHLTw1prXfKw1lqXPKy11iU/fFTxm1SmijcqJpWpYqqYVKaKSeUNlZOKSeVE5aRiUpkqJpWpYlJ5o+Kk4kTljYpJZVJ5o+JE5aTiRGWqmFSmiknlv+RhrbUueVhrrUse1lrrkh8uU7mp4kRlqphUvqh4o2JSeUPlJpUTlaliUpkqTlS+UJkq3lCZKk5UpopJ5SaVL1ROKiaVSWWquOlhrbUueVhrrUse1lrrkh8uqzhReUNlqpgqJpWpYlJ5Q+Wk4o2KN1QmlaliUnmj4guVL1ROVKaKSeVEZar4omJSOVGZKiaVSWWqOFE5qfibHtZa65KHtda65GGttS754TKVqWKqmFROKk5UblI5qZhU/ksqbqr4TRUnKicVk8obFScVJxUnKpPKVDGpTCpvqEwVf9PDWmtd8rDWWpc8rLXWJT98pDJVTCpTxVRxojJVnFRMKicqU8WJylRxk8pJxYnKVHGiMlVMKlPFVDGpnKhMFScVk8pJxaRyojJVnKicVJxUnFRMKm9UnKicVHzxsNZalzystdYlD2utdckPf5nKVDGpTBX/ZSpTxYnKGxUnKicqb6icqEwVX6hMFTdVTCpfVEwqk8qJyk0Vk8pJxaRy08Naa13ysNZalzystdYlP1ymclIxqUwVk8pJxaQyVZyoTCpTxVTxhspUMalMFScqN1WcqJyoTBU3qZxUTConFZPKpPJFxaTyRsUbKlPFpPI3Pay11iUPa611ycNaa11if3CRyhsVk8pUMan8popJZaqYVE4qTlROKiaVqWJSmSomlaniDZWpYlI5qZhUTiomlZOKSeWkYlI5qZhUTiomlS8qJpWpYlKZKn7Tw1prXfKw1lqXPKy11iX2B3+RylRxonJSMalMFZPKScWkMlWcqJxUTCpTxRcqJxUnKicVk8pUMan8SxWTyhsVb6hMFZPKScUbKicVk8pJxRcPa611ycNaa13ysNZal/zwy1Smijcq/qWKv0llqnijYlJ5o2JSOamYVKaKSWWqmFS+qJhUTipOVE4q3qiYVE5Upor/soe11rrkYa21LnlYa61L7A8uUpkqJpWp4kTli4oTlS8qTlROKiaVqWJSmSomlaliUpkqJpWpYlKZKr5QmSpOVG6qOFF5o+JEZaqYVKaKN1ROKn7Tw1prXfKw1lqXPKy11iU/fKQyVUwqb6hMFW+oTCpTxRsVb6hMFZPKpDJV3KRyU8WJyknFicobFZPKGypTxUnFpDKpvKFyonKTylRx08Naa13ysNZalzystdYlP1ymMlWcqEwVk8obFZPKGxUnKr9J5Q2VqWJSmSq+UDmpOFE5qZhUpopJ5YuKN1SmikllqjhRmSomlZOKN1Qmlanii4e11rrkYa21LnlYa61Lfvio4kRlqnijYlJ5o+ILlTcqvqg4UZkqJpWp4kRlqjipeEPlpOKk4qRiUjmp+JdUvqh4Q2WqmFRuelhrrUse1lrrkoe11rrkh49Uvqg4UTmpOFE5qTipOFGZVKaKk4oTlaliUjlRmSpOVN6oeKNiUpkqJpU3KiaVE5Wp4qRiUpkqJpWpYlL5QmWqmComld/0sNZalzystdYlD2utdckPv6xiUpkqJpWpYlI5UflCZaqYVH6TyhcVb1RMKm+oTBVTxaQyVUwqb1R8UXFSMalMFW+oTBWTyhcqJxWTyk0Pa611ycNaa13ysNZal9gfXKQyVXyhMlV8oTJVnKhMFZPKTRWTyhcVk8pU8YXKVDGpTBW/SeWkYlKZKiaVv6niROWNiknlpOKLh7XWuuRhrbUueVhrrUvsDz5QmSreUJkqTlSmikllqviXVKaKSeWNikllqjhROamYVKaKf0llqjhRmSreUJkq/iaVk4pJ5Y2Kmx7WWuuSh7XWuuRhrbUu+eEvUzlReUNlqjhRmSreUDmpmCreqJhUJpWpYlI5qZhUJpUTlTcqJpWTiknlJpWTijdUpoo3VL5QeaPiNz2stdYlD2utdcnDWmtdYn/wgcobFZPKVPGGylRxojJVTCr/ZRWTyknFpHJS8YbKGxWTyknFicpUMamcVEwqb1RMKlPFpHJS8YbKVDGpnFTc9LDWWpc8rLXWJQ9rrXXJD3+ZyhsqU8UbKicqb1RMKlPFpDJVTCpTxRsVk8pJxaRyojJV3FRxojJVvFExqUwqv0nlC5Wp4kRlqjhRmSq+eFhrrUse1lrrkoe11rrkh7+sYlI5qXhDZaqYVKaKSWWq+JtUpopJ5aRiUpkq3qh4o+I3qZyovFExqUwVk8qkMlVMKlPFpHJScZPKb3pYa61LHtZa65KHtda6xP7gA5WpYlL5myomlTcqJpWTikllqphUpooTlTcq3lC5qeJE5aTiDZWp4kRlqphU/n9W8cXDWmtd8rDWWpc8rLXWJT98VDGp3FQxqUwVk8pNFZPKpPK/rGJSmSomlaliUvlC5Y2KSeWk4qaKE5WpYlL5lypuelhrrUse1lrrkoe11rrkh19WMamcVEwqb1ScqEwVX1RMKpPKicpJxYnKpPIvVbyhclPFb6p4o2JSOamYVG6qmFSmii8e1lrrkoe11rrkYa21LvnhI5WpYlKZKk5UpopJZVL5l1TeqJhUpopJ5aTiC5WpYlKZKk5UvqiYVKaKSWWq+KJiUnlDZar4omJSmSomlX/pYa21LnlYa61LHtZa65IfPqqYVKaKSWWqOFF5o2JSeUNlqpgqJpWpYlKZVKaKSWWqmFQmlaliUpkqvlCZKk4qvqg4qfhNFZPKScUbFScqU8Wk8l/ysNZalzystdYlD2utdckPl1WcVLxR8YbKVDGpTConKlPFicpU8YXKGypfqEwVJyq/SWWqmFS+qPiiYlI5qThR+aLiROU3Pay11iUPa611ycNaa11if3CRylQxqXxRMamcVEwqJxVvqHxRcaJyUnGiclJxojJVnKhMFZPKVDGpTBW/SWWqeENlqphUbqqYVL6ouOlhrbUueVhrrUse1lrrEvuDi1SmihOVqeJEZaqYVE4qJpUvKiaVqeJE5Y2Km1SmihOVmyomlZOKSeWkYlKZKiaVk4o3VE4qvlB5o2JSmSq+eFhrrUse1lrrkoe11rrE/uADlf+yihOVk4o3VE4qJpWpYlL5omJSmSpOVKaKL1S+qDhROamYVN6omFSmihOVk4pJZaqYVE4qJpWTii8e1lrrkoe11rrkYa21LvnhsorfpDJVvKFyUjGpnFScVLyhclLxm1TeUHmj4kRlqjhRmSomlUllqphU/iWVqWJSmSomlUllqvhND2utdcnDWmtd8rDWWpfYH1yk8kXFpDJVnKicVLyhMlXcpDJVnKhMFScqb1RMKm9UTCpTxaRyUnGiMlWcqNxU8YXKVDGpfFExqZxUfPGw1lqXPKy11iUPa611yQ+XVUwqU8UbFScqU8WJyknFVDGpvFExqZyofKHyhcpJxaQyqXxRcaJyojJVnFRMKicVb6hMFf8lFTc9rLXWJQ9rrXXJw1prXWJ/cJHKGxWTyhsVJypfVEwqU8UbKicVJyonFScqJxWTyknFpDJVTCq/qeILlaliUjmpmFTeqDhR+U0VXzystdYlD2utdcnDWmtd8sM/pnJScaLyRcWk8obKFxUnKm+onFS8UfGbKiaVqWJSmSomlaniN1VMKv9SxaQyVfymh7XWuuRhrbUueVhrrUt++Ejli4oTlZOKSWWqOFH5ouJEZaqYVKaKNypOVN5QeaPipopJ5QuVqeKLipsqJpWTijcqJpWTii8e1lrrkoe11rrkYa21Lvnho4o3VN6oOFF5Q2WqmFQmlROVqeKmihOVk4pJZaqYKiaVL1SmijcqTlROKiaVk4pJZaqYVKaKLypOVKaKSeWk4jc9rLXWJQ9rrXXJw1prXfLDX1bxhspJxRsVv0nljYoTlaliqjhRmSomlTcqJpWTiknljYq/SWWq+ELljYqTipOKE5WTii8e1lrrkoe11rrkYa21LvnhI5WpYlJ5o2KqOFGZKk5UbqqYVH6TyknFicoXKlPFpPJFxaQyVUwVk8qkMlWcqJyofFHxhsoXFX/Tw1prXfKw1lqXPKy11iU/fFRxk8pJxVTxRsUbKjep3FQxqbxRcaIyVbyhclIxqUwVJypTxYnKVPFGxaTyhspUcVPFpPI3Pay11iUPa611ycNaa11if/CByhsVk8pU8YXKVDGpvFExqUwVJypTxYnKVDGpnFScqJxUvKEyVUwqU8UbKicVk8pJxYnKScWJylTxhspUcaJyU8UXD2utdcnDWmtd8rDWWpf88JepTBUnKlPFScWkMlWcqJxU3KTyRcWkclIxqUwqf5PKGxUnFScqJxUnKl+ovKHyRcWk8pse1lrrkoe11rrkYa21LrE/+B+m8kbFpDJVnKi8UXGiclJxojJVTCpvVLyh8kbFFypTxYnKScWkclIxqUwVb6hMFW+oTBWTylTxmx7WWuuSh7XWuuRhrbUu+eEjlb+p4qTiJpWp4qaKSeVEZaqYVG5SmSpOKiaV36QyVUwVJyonFZPKVPGGyhsqU8UbFZPKScUXD2utdcnDWmtd8rDWWpf8cFnFTSpvqNxUcaLym1SmijcqJpU3Kt5QOVG5qWJSmSreqDipeEPli4qbKn7Tw1prXfKw1lqXPKy11iU//DKVNyq+qJhUpopJ5URlqpgqTlSmikllqphU3qj4QuWLijdUpopJ5URlqjhRmSreUPlNKr9J5aTii4e11rrkYa21LnlYa61Lfvg/RuVE5UTlROWNikllqphUpopJ5aRiUpkqJpWbVL5Q+ULlDZWbKiaVqeJE5Y2KSeWkYlK56WGttS55WGutSx7WWuuSH/7HVUwqU8WkclIxqUwVJyqTyonKVPGbVL6omFRuqjhRmSomlaniRGWqmFS+qHij4g2VN1R+08Naa13ysNZalzystdYlP/yyir+p4qRiUjmpmFSmiqliUpkqTlROKiaVSWWqmFSmiknli4rfVDGpfFHxRsUXKlPFicpU8V/2sNZalzystdYlD2utdckPl6n8TSpvVEwVk8pJxaQyVUwVk8pJxaTyhcpUMamcVHyh8kXFb1KZKt5QeaNiUnlDZao4UZkqJpWbHtZa65KHtda65GGttS6xP1hrrQse1lrrkoe11rrkYa21LnlYa61LHtZa65KHtda65GGttS55WGutSx7WWuuSh7XWuuRhrbUueVhrrUse1lrrkoe11rrkYa21Lvl/hDhILcOM/+8AAAAASUVORK5CYII=",
                            "sessionId": "ac67c766-3de9-4b4e-a2e2-a56a5d638717"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Session Profile',
                url: '/sessions/:deviceId/profile',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [
                    templatePathVariable.device],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "device": {
                                "name": "Device 999",
                                "phone": "62********",
                                "sessions": [
                                    {
                                        "sessionId": "784b4f3c-364b-49d4-ac48-e22d58edc246"
                                    }
                                ]
                            },
                            "profileName": "Forwadskuy",
                            "presence": "available",
                            "status": "sedang turu",
                            "address": "Civic Center, Mountain View, CA 94041, USA"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Session Profile',
                url: '/sessions/:deviceId/profile',
                method: 'PUT',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                pathVariables: [
                    templatePathVariable.device],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "name": "Forwadskuy",
                        "presence": "unavailable",
                        "status": "sedang turu"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Session profile updated successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get All Sessions',
                url: '/sessions',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            {
                                "sessionId": "6ff83c6c-3a9c-4ea2-9405-1deffe173bf7",
                                "device": {
                                    "id": "1f9d390a-7348-4198-84d4-1d05448f0c84"
                                }
                            }
                        ],
                        status: 200
                    },
                ]
            },
        ]
    },
    {
        group: 'Contact',
        apiList: [
            {
                name: 'Get All Contacts',
                url: '/contacts',
                method: 'GET',
                queryParams: [
                    {
                        name: 'deviceId',
                        description: 'filter by deviceId'
                    }
                ],
                headers: [...bothTokenHeader],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            {
                                "pkId": 2,
                                "id": "e271da95-4fc8-4c08-aec4-c3711d0a9ed1",
                                "firstName": "Gajah",
                                "lastName": "Mada",
                                "phone": "6182910011",
                                "email": "kucing@gmail.com",
                                "gender": "male",
                                "dob": "1945-12-18T00:00:00.000Z",
                                "colorCode": "974B2C",
                                "createdAt": "2023-10-16T06:38:51.482Z",
                                "updatedAt": "2023-10-16T06:38:51.482Z",
                                "ContactLabel": [
                                    {
                                        "label": {
                                            "name": "manusia purba kala"
                                        }
                                    }
                                ]
                            }
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Get All Contacts Labels',
                url: '/contacts/labels',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            "manusia purba kala",
                            "avenger",
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Contact',
                url: '/contacts/:contactId',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [
                    templatePathVariable.contact
                ],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "pkId": 3,
                            "id": "8dfae883-c186-4c8c-b2db-5892e2578421",
                            "firstName": "Anja",
                            "lastName": "Ria",
                            "phone": "62*******",
                            "email": "amrizing@gmail.com",
                            "gender": "male",
                            "dob": "2000-10-29T00:00:00.000Z",
                            "colorCode": "B09B0A",
                            "createdAt": "2023-11-02T08:56:50.613Z",
                            "updatedAt": "2023-11-02T08:56:50.613Z",
                            "ContactLabel": [],
                            "contactDevices": [
                                {
                                    "device": {
                                        "name": "Bunda",
                                        "id": "6bcc830e-e9bc-4df9-9116-ac051309c65b"
                                    }
                                }
                            ],
                            "contactGroups": []
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Create Contact',
                url: '/contacts/create',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "firstName": "Gajah",
                        "lastName": "Mada",
                        "email": "kucing@gmail.com",
                        "phone": "6182910011",
                        "gender": "male",
                        "dob": "1945-12-18",
                        "deviceId": "d070def3-2ed0-430a-a9ae-2627f0d61bcc",
                        "labels": ["manusia purba kala"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Contact created successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Import Contact',
                url: '/contacts/import',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.formdata],
                type: 'formdata',
                formDataSampleRequests: [
                    {
                        key: 'deviceId',
                        value: 'iu82915-a8a0-4e15-9eee-a1ffbd5c859b'
                    },
                    {
                        key: 'file',
                        value: 'your excel or csv file'
                    },
                    {
                        key: 'groupName',
                        value: 'sampleGroup'
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "results": [
                                {
                                    "index": 0,
                                    "createdContact": {
                                        "pkId": 319,
                                        "id": "ce934015-a8a0-4e15-9eee-a1ffbd5c859b",
                                        "firstName": "Dinda",
                                        "lastName": "ADS",
                                        "phone": "6285856343774",
                                        "email": "dinda@ads.id",
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "0F0FDA",
                                        "createdAt": "2023-11-21T21:54:04.243Z",
                                        "updatedAt": "2023-11-21T21:54:04.243Z"
                                    }
                                },
                                {
                                    "index": 1,
                                    "createdContact": {
                                        "pkId": 320,
                                        "id": "da2e881c-c6c2-4d16-9692-b99b03ef7b81",
                                        "firstName": "Cindi",
                                        "lastName": "ADS",
                                        "phone": "6285749855851",
                                        "email": "cindi@ads.id",
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "DAA292",
                                        "createdAt": "2023-11-21T21:54:04.319Z",
                                        "updatedAt": "2023-11-21T21:54:04.319Z"
                                    }
                                },
                                {
                                    "index": 2,
                                    "createdContact": {
                                        "pkId": 321,
                                        "id": "93aa4858-5e09-44a9-8f50-e9e6949c4de5",
                                        "firstName": "Dila",
                                        "lastName": "ADS",
                                        "phone": "6288216170374",
                                        "email": "dila@ads.id",
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "0692AE",
                                        "createdAt": "2023-11-21T21:54:04.363Z",
                                        "updatedAt": "2023-11-21T21:54:04.363Z"
                                    }
                                },
                                {
                                    "index": 3,
                                    "createdContact": {
                                        "pkId": 322,
                                        "id": "85176aff-6e00-4bc0-b2f1-9eafe713bfc5",
                                        "firstName": "Alif",
                                        "lastName": "ADS",
                                        "phone": "6281357995175",
                                        "email": "alif@ads.id",
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "71E266",
                                        "createdAt": "2023-11-21T21:54:04.407Z",
                                        "updatedAt": "2023-11-21T21:54:04.407Z"
                                    }
                                },
                                {
                                    "index": 4,
                                    "createdContact": {
                                        "pkId": 323,
                                        "id": "c14f0ed4-857a-4aab-8a2d-7bbbfa1c5294",
                                        "firstName": "Ihsan",
                                        "lastName": "ADS",
                                        "phone": "62*********",
                                        "email": "ihsan@ads.id",
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "8D3E83",
                                        "createdAt": "2023-11-21T21:54:04.452Z",
                                        "updatedAt": "2023-11-21T21:54:04.452Z"
                                    }
                                }
                            ],
                            "errors": []
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Sync Google Contact',
                url: '/contacts/sync-google',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "accessToken": "ya29.a0AfB_byAbx_U_Iag266_L19naFz4iuCbGE004mKpirYuRwRsL16xnvMyrezSCaFUZ8G4x114jx86Bvb8U_NzMZT0WBrNB7KvMozfFWoueXUJg-0iiRwYEdU-MisTcITlW4nk4U9jvdhpPK8Dh-ccaj_uqy9BwwpKJD2ysaCgYKAZoSARMSFQHGX2MiAprCqYOE0rZPywy8oMn-1g0171",
                        "deviceId": "7128c383-bf1b-4f97-aac8-3e808a344fc2"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "results": [
                                {
                                    "index": 0,
                                    "uploaded": "+6281325716470"
                                },
                                {
                                    "index": 1,
                                    "uploaded": "+62*******"
                                },
                                {
                                    "index": 2,
                                    "uploaded": ""
                                },
                                {
                                    "index": 3,
                                    "uploaded": "+62881026841818"
                                },
                                {
                                    "index": 4,
                                    "uploaded": ""
                                },
                                {
                                    "index": 5,
                                    "uploaded": "+6285848185142"
                                },
                                {
                                    "index": 6,
                                    "uploaded": "+6282228288929"
                                },
                                {
                                    "index": 7,
                                    "uploaded": "+62895363402509"
                                },
                                {
                                    "index": 8,
                                    "uploaded": "+6285645161455"
                                },
                                {
                                    "index": 9,
                                    "uploaded": "+6285726470326"
                                },
                                {
                                    "index": 10,
                                    "uploaded": "+6288290106613"
                                },
                                {
                                    "index": 11,
                                    "uploaded": "+6282234253231"
                                },
                                {
                                    "index": 12,
                                    "uploaded": "+6285867608243"
                                },
                                {
                                    "index": 13,
                                    "uploaded": "+62895374567911"
                                },
                                {
                                    "index": 14,
                                    "uploaded": "+6281133338222"
                                },
                                {
                                    "index": 15,
                                    "uploaded": "+6285726844065"
                                },
                                {
                                    "index": 16,
                                    "uploaded": "+6282233883995"
                                },
                                {
                                    "index": 17,
                                    "uploaded": "+628155013228"
                                },
                                {
                                    "index": 18,
                                    "uploaded": "+6281385423378"
                                },
                                {
                                    "index": 19,
                                    "uploaded": "+6282131224488"
                                },
                                {
                                    "index": 20,
                                    "uploaded": "+6282213125103"
                                },
                                {
                                    "index": 21,
                                    "uploaded": "+62********"
                                },
                                {
                                    "index": 22,
                                    "uploaded": "+6282244607846"
                                },
                                {
                                    "index": 23,
                                    "uploaded": "+6233687358160"
                                },
                                {
                                    "index": 24,
                                    "uploaded": "+6262818570009"
                                },
                                {
                                    "index": 25,
                                    "uploaded": "+628172814540"
                                },
                                {
                                    "index": 26,
                                    "uploaded": "+628970420787"
                                },
                                {
                                    "index": 0,
                                    "downloaded": {
                                        "pkId": 324,
                                        "id": "c43ae829-564d-40a1-934e-74d0027aa912",
                                        "firstName": "Kl Reni",
                                        "lastName": null,
                                        "phone": "6281311358176",
                                        "email": null,
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "093DCC",
                                        "createdAt": "2023-11-22T07:27:16.298Z",
                                        "updatedAt": "2023-11-22T07:27:16.298Z"
                                    }
                                },
                                {
                                    "index": 1,
                                    "downloaded": {
                                        "pkId": 325,
                                        "id": "db989a0f-055f-4257-b12a-174be203b17a",
                                        "firstName": "Kl Nina",
                                        "lastName": null,
                                        "phone": "6281318971869",
                                        "email": null,
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "54D3DC",
                                        "createdAt": "2023-11-22T07:27:16.341Z",
                                        "updatedAt": "2023-11-22T07:27:16.341Z"
                                    }
                                },
                                {
                                    "index": 2,
                                    "downloaded": {
                                        "pkId": 326,
                                        "id": "ebeed579-ac23-4e64-9484-e669a635a874",
                                        "firstName": "Sd Nia",
                                        "lastName": null,
                                        "phone": "6282114792759",
                                        "email": null,
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "297180",
                                        "createdAt": "2023-11-22T07:27:16.368Z",
                                        "updatedAt": "2023-11-22T07:27:16.368Z"
                                    }
                                }
                            ]
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Contact',
                url: '/contacts/:contactId',
                method: 'PUT',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                pathVariables: [
                    templatePathVariable.contact
                ],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "firstName": "Monkey",
                        "lastName": "D. Luffy",
                        "email": "strawhat@gmail.com",
                        "phone": "1124795006",
                        "gender": "male",
                        "dob": "2002-05-05"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Contact updated successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Delete Contacts',
                url: '/contacts',
                method: 'DELETE',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "contactIds": ["a4a9b2ee-7d64-455e-999b-74b520d3eaa5"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Contact deleted successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Add Contact to Groups',
                url: '/contacts/add',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "contactId": "e271da95-4fc8-4c08-aec4-c3711d0a9ed1",
                        "groupIds": ["13ac65a1-34cf-491b-8e67-4790a75c6d78"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Contact added to group(s) successfully"
                        },
                        status: 200
                    },
                ]
            },
        ]
    },
    {
        group: 'Group',
        apiList: [
            {
                name: 'Get All Groups',
                url: '/groups',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            {
                                "pkId": 1,
                                "id": "266b7951-8511-4a4c-add1-dc6f9d38e226",
                                "name": "IMPORT_Coba import kontak",
                                "type": "import",
                                "userId": 3,
                                "createdAt": "2023-11-22T06:11:19.132Z",
                                "updatedAt": "2023-11-22T06:11:19.132Z",
                                "contactGroups": [],
                                "membersCount": 0
                            },
                            {
                                "pkId": 2,
                                "id": "fb28f683-0d64-4d17-8aac-6528fd2ed56a",
                                "name": "IMPORT_Coba import kontak@",
                                "type": "import",
                                "userId": 3,
                                "createdAt": "2023-11-22T07:19:36.163Z",
                                "updatedAt": "2023-11-22T07:19:36.163Z",
                                "contactGroups": [
                                    {
                                        "pkId": 8,
                                        "id": "2a219aee-b947-4d7c-8bce-f45f1d35e1cb",
                                        "contactId": 8,
                                        "groupId": 2
                                    },
                                    {
                                        "pkId": 9,
                                        "id": "fdea96c6-7e01-4a56-b6f3-d4cf1e0005c7",
                                        "contactId": 9,
                                        "groupId": 2
                                    },
                                    {
                                        "pkId": 10,
                                        "id": "c6f23d95-8869-4e1c-8972-ea450ab1fd89",
                                        "contactId": 10,
                                        "groupId": 2
                                    }
                                ],
                                "membersCount": 3
                            },
                            {
                                "pkId": 3,
                                "id": "da89bd82-7920-46d7-86f3-419eb08ee2e6",
                                "name": "IMPORT_Lorem",
                                "type": "import",
                                "userId": 3,
                                "createdAt": "2023-11-22T07:24:02.804Z",
                                "updatedAt": "2023-11-22T07:24:02.804Z",
                                "contactGroups": [
                                    {
                                        "pkId": 11,
                                        "id": "ce0840a8-3173-4119-b6ba-68c925ede4be",
                                        "contactId": 11,
                                        "groupId": 3
                                    },
                                    {
                                        "pkId": 12,
                                        "id": "794462e2-ded5-4ab7-8a96-7f2a76adb759",
                                        "contactId": 12,
                                        "groupId": 3
                                    }
                                ],
                                "membersCount": 2
                            },
                            {
                                "pkId": 4,
                                "id": "d2f7dc2c-42c4-4edb-9e9d-de0a623f193c",
                                "name": "CP_CP BRO",
                                "type": "campaign",
                                "userId": 3,
                                "createdAt": "2023-11-22T07:25:09.279Z",
                                "updatedAt": "2023-11-22T07:31:43.255Z",
                                "contactGroups": [],
                                "membersCount": 0
                            },
                            {
                                "pkId": 5,
                                "id": "d2da1398-baef-46a3-8864-182bc6c95a64",
                                "name": "",
                                "type": "manual",
                                "userId": 4,
                                "createdAt": "2023-11-22T07:33:18.859Z",
                                "updatedAt": "2023-11-22T07:33:30.117Z",
                                "contactGroups": [
                                    {
                                        "pkId": 13,
                                        "id": "ad3cb94a-9979-443d-b55a-595f479fe9fe",
                                        "contactId": 13,
                                        "groupId": 5
                                    }
                                ],
                                "membersCount": 1
                            },
                            {
                                "pkId": 6,
                                "id": "e042e7eb-1160-42cf-89fd-8306f0d90d46",
                                "name": "CP_CP brok",
                                "type": "campaign",
                                "userId": 3,
                                "createdAt": "2023-11-22T07:33:34.862Z",
                                "updatedAt": "2023-11-22T07:33:34.862Z",
                                "contactGroups": [],
                                "membersCount": 0
                            }
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Group',
                url: '/groups/:groupId',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [
                    templatePathVariable.group
                ],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "pkId": 4,
                            "id": "d1b59e3a-bfb0-42ae-9e23-3c82657db72f",
                            "name": "SYNC_Toko Sebelah",
                            "type": "import",
                            "userId": 1,
                            "createdAt": "2023-11-21T21:49:42.499Z",
                            "updatedAt": "2023-11-21T21:49:42.499Z",
                            "contactGroups": [
                                {
                                    "pkId": 4,
                                    "id": "48d0d266-15fa-4f8b-8576-389b6b8e0f99",
                                    "contactId": 314,
                                    "groupId": 4,
                                    "contact": {
                                        "pkId": 314,
                                        "id": "aa1b5634-eea7-4287-b281-83f91d31dd64",
                                        "firstName": "Dinda",
                                        "lastName": "ADS",
                                        "phone": "6285856343774",
                                        "email": "dinda@ads.id",
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "D663FD",
                                        "createdAt": "2023-11-21T21:49:42.499Z",
                                        "updatedAt": "2023-11-21T21:49:42.499Z"
                                    }
                                },
                                {
                                    "pkId": 5,
                                    "id": "6ec9a58b-379d-424c-a0b1-b0157bedddd3",
                                    "contactId": 315,
                                    "groupId": 4,
                                    "contact": {
                                        "pkId": 315,
                                        "id": "49258e60-b494-4ab5-a0f1-002d595e5a8d",
                                        "firstName": "Cindi",
                                        "lastName": "ADS",
                                        "phone": "6285749855851",
                                        "email": "cindi@ads.id",
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "3DA489",
                                        "createdAt": "2023-11-21T21:49:42.562Z",
                                        "updatedAt": "2023-11-21T21:49:42.562Z"
                                    }
                                },
                                {
                                    "pkId": 6,
                                    "id": "5754ce95-3f5e-4d10-8430-6298672ac116",
                                    "contactId": 316,
                                    "groupId": 4,
                                    "contact": {
                                        "pkId": 316,
                                        "id": "1e061329-357e-4b2c-9878-f7e340a04758",
                                        "firstName": "Dila",
                                        "lastName": "ADS",
                                        "phone": "6288216170374",
                                        "email": "dila@ads.id",
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "E907F6",
                                        "createdAt": "2023-11-21T21:49:42.595Z",
                                        "updatedAt": "2023-11-21T21:49:42.595Z"
                                    }
                                },
                                {
                                    "pkId": 7,
                                    "id": "5ab88da5-3700-498a-a71f-feb0211ad22c",
                                    "contactId": 317,
                                    "groupId": 4,
                                    "contact": {
                                        "pkId": 317,
                                        "id": "c3f09893-bde3-41dd-8ac7-6e0856ece71f",
                                        "firstName": "Alif",
                                        "lastName": "ADS",
                                        "phone": "6281357995175",
                                        "email": "alif@ads.id",
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "585871",
                                        "createdAt": "2023-11-21T21:49:42.626Z",
                                        "updatedAt": "2023-11-21T21:49:42.626Z"
                                    }
                                },
                                {
                                    "pkId": 8,
                                    "id": "8ff18d76-f526-496e-9c4b-22522e14545e",
                                    "contactId": 318,
                                    "groupId": 4,
                                    "contact": {
                                        "pkId": 318,
                                        "id": "9b98cdf5-2a24-4b00-98b2-572301abc813",
                                        "firstName": "Ihsan",
                                        "lastName": "ADS",
                                        "phone": "62*********",
                                        "email": "ihsan@ads.id",
                                        "gender": null,
                                        "dob": null,
                                        "colorCode": "4C3CFE",
                                        "createdAt": "2023-11-21T21:49:42.662Z",
                                        "updatedAt": "2023-11-21T21:49:42.662Z"
                                    }
                                }
                            ]
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Create Group',
                url: '/groups/create',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "name": "Green Lattern Group"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Group created successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Group',
                url: '/groups/:groupId/update',
                method: 'PUT',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                pathVariables: [
                    templatePathVariable.group
                ],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "name": "Green Lattern Group"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Group updated successfully",
                            "data": {
                                "pkId": 3,
                                "id": "46ff8e8a-4207-4042-9fcf-0848c9274428",
                                "name": "BOOM Group",
                                "isCampaign": true,
                                "userId": 1
                            }
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Delete Group',
                url: '/groups',
                method: 'DELETE',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "groupIds": ["a4d1bad9-c5c9-40f6-81df-c351f456dae5"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Group(s) deleted successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Add Members',
                url: '/groups/add',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "groupId": "46ff8e8a-4207-4042-9fcf-0848c9274428",
                        "contactIds": ["4a63e462-744b-4d47-be34-d84721556e23", "89a269a4-4831-4d7d-a5d1-ac0e96006469"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Contact(s) added to group successfully",
                            "addedContactIds": [
                                "4a63e462-744b-4d47-be34-d84721556e23",
                                "89a269a4-4831-4d7d-a5d1-ac0e96006469"
                            ]
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Remove Members',
                url: '/groups/remove',
                method: 'DELETE',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "groupId": "6a078407-5133-4624-820a-6ff6f07cd71c",
                        "contactIds": ["9e2b07a8-c008-433c-bcaf-d3b2244bf986", "7955508d-7741-49dc-b5db-ad50c6813bc7"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Member removed from group successfully"
                        },
                        status: 200
                    },
                ]
            },
        ]
    },
    {
        group: 'Template',
        apiList: [
            {
                name: 'Create Template',
                url: '/templates',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "name": "template-3",
                        "message": "PROMO PAYDAY 😍",
                        "userId": "94113dc4-f137-48e0-9441-7332e9d19a8a"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Template created successfully",
                            "template": {
                                "pkId": 3,
                                "id": "842f09fc-8b1a-452b-909c-a43c1c52d2ab",
                                "name": "template-3",
                                "message": "PROMO PAYDAY 😍",
                                "userId": 1,
                                "createdAt": "2023-11-25T00:14:00.225Z",
                                "updatedAt": "2023-11-25T00:14:00.225Z"
                            }
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Template',
                url: '/templates',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            {
                                "pkId": 1,
                                "id": "3d20f470-b0fe-43ab-9222-ff3f359ee456",
                                "name": "template-1",
                                "message": "selamat datang brow",
                                "userId": 1,
                                "createdAt": "2023-11-25T00:12:38.528Z",
                                "updatedAt": "2023-11-25T00:12:38.528Z"
                            },
                            {
                                "pkId": 2,
                                "id": "eb43f49c-b947-43eb-a6c9-f05416a361ff",
                                "name": "template-2",
                                "message": "ada yang baruh nih!????",
                                "userId": 1,
                                "createdAt": "2023-11-25T00:13:27.280Z",
                                "updatedAt": "2023-11-25T00:13:27.280Z"
                            },
                            {
                                "pkId": 3,
                                "id": "842f09fc-8b1a-452b-909c-a43c1c52d2ab",
                                "name": "template-3",
                                "message": "PROMO PAYDAY 😍",
                                "userId": 1,
                                "createdAt": "2023-11-25T00:14:00.225Z",
                                "updatedAt": "2023-11-25T00:14:00.225Z"
                            }
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Delete Template',
                url: '/templates',
                method: 'DELETE',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "templateIds": ["3d20f470-b0fe-43ab-9222-ff3f359ee456", "842f09fc-8b1a-452b-909c-a43c1c52d2ab"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Template(s) deleted successfully"
                        },
                        status: 200
                    },
                ]
            },
        ]
    },
    {
        group: 'Messages',
        apiList: [
            {
                name: 'Get Incoming Messages',
                url: '/messages/:sessionId/incoming',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                pathVariables: [templatePathVariable.session],
                queryParams: [
                    {
                        name: 'page',
                        description: 'get messages of current page of pagination'
                    },
                    {
                        name: 'pageSize',
                        description: 'how many messages taken from each page'
                    },
                    {
                        name: 'message',
                        description: 'search query by messages'
                    },
                    {
                        name: 'phoneNumber',
                        description: 'search by phone number, must be (country code without +)(number) e.g. 6281234567'
                    },
                    {
                        name: 'contactName',
                        description: 'search query by contact name'
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "data": [
                                {
                                    "pkId": 52,
                                    "id": "AFEE8A7E56D2EBE688C1FC0343215348",
                                    "from": "62*******@s.whatsapp.net",
                                    "message": "nwbshx",
                                    "receivedAt": "2023-12-26T07:59:11.000Z",
                                    "mediaPath": "images/uploads/130A3944E9C93EE33D6ED2EFDE026B37.jpg",
                                    "createdAt": "2023-12-26T07:59:11.699Z",
                                    "updatedAt": "2023-12-26T07:59:11.699Z",
                                    "sessionId": "0fb9a143-8d5b-4c3d-9eb9-165f1f033022",
                                    "contactId": 3,
                                    "contact": {
                                        "firstName": "Gajah",
                                        "lastName": "Mada",
                                        "colorCode": "7CFE64"
                                    }
                                },
                                {
                                    "pkId": 51,
                                    "id": "370327EABC780D4F6981BAF7C1361D1A",
                                    "from": "62*******@s.whatsapp.net",
                                    "message": "bwiwjsghh",
                                    "receivedAt": "2023-12-26T07:59:09.000Z",
                                    "createdAt": "2023-12-26T07:59:09.705Z",
                                    "updatedAt": "2023-12-26T07:59:09.705Z",
                                    "sessionId": "0fb9a143-8d5b-4c3d-9eb9-165f1f033022",
                                    "contactId": 3,
                                    "contact": {
                                        "firstName": "Gajah",
                                        "lastName": "Mada",
                                        "colorCode": "7CFE64"
                                    }
                                },
                                {
                                    "pkId": 50,
                                    "id": "9565D9B802F5C0ABF8EC2E35281662A4",
                                    "from": "62*******@s.whatsapp.net",
                                    "message": "absmzh",
                                    "receivedAt": "2023-12-26T07:59:07.000Z",
                                    "createdAt": "2023-12-26T07:59:07.678Z",
                                    "updatedAt": "2023-12-26T07:59:07.678Z",
                                    "sessionId": "0fb9a143-8d5b-4c3d-9eb9-165f1f033022",
                                    "contactId": 3,
                                    "contact": {
                                        "firstName": "Gajah",
                                        "lastName": "Mada",
                                        "colorCode": "7CFE64"
                                    }
                                }
                            ],
                            "metadata": {
                                "totalMessages": 6,
                                "currentPage": 1,
                                "totalPages": 2,
                                "hasMore": true
                            }
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Outgoing Messages',
                url: '/messages/:sessionId/outgoing',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                pathVariables: [templatePathVariable.session],
                queryParams: [
                    {
                        name: 'page',
                        description: 'get messages of current page of pagination'
                    },
                    {
                        name: 'pageSize',
                        description: 'how many messages taken from each page'
                    },
                    {
                        name: 'message',
                        description: 'search query by messages'
                    },
                    {
                        name: 'phoneNumber',
                        description: 'search by phone number, must be (country code without +)(number) e.g. 6281234567'
                    },
                    {
                        name: 'contactName',
                        description: 'search query by contact name'
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "data": [
                                {
                                    "pkId": 15,
                                    "id": "04083B7604E9F92BBDB19679495D3189",
                                    "to": "62*********@s.whatsapp.net",
                                    "message": "xiane",
                                    "schedule": "2023-12-26T08:14:47.463Z",
                                    "mediaPath": "images/uploads/130A3944E9C93EE33D6ED2EFDE026B37.jpg",
                                    "status": "read",
                                    "createdAt": "2023-12-26T08:14:47.465Z",
                                    "updatedAt": "2023-12-26T08:17:16.975Z",
                                    "sessionId": "0fb9a143-8d5b-4c3d-9eb9-165f1f033022"
                                },
                                {
                                    "pkId": 16,
                                    "id": "46D9C360BE48C4FCE9568E37D7C87CD8",
                                    "to": "62*********@s.whatsapp.net",
                                    "message": "jwkqx",
                                    "schedule": "2023-12-26T08:14:48.644Z",
                                    "status": "read",
                                    "createdAt": "2023-12-26T08:14:48.645Z",
                                    "updatedAt": "2023-12-26T08:17:16.964Z",
                                    "sessionId": "0fb9a143-8d5b-4c3d-9eb9-165f1f033022"
                                },
                                {
                                    "pkId": 17,
                                    "id": "967BFCDF577EDCB1097CE1935E23C8E7",
                                    "to": "62*********@s.whatsapp.net",
                                    "message": "jwkx",
                                    "schedule": "2023-12-26T08:14:50.285Z",
                                    "status": "read",
                                    "createdAt": "2023-12-26T08:14:50.286Z",
                                    "updatedAt": "2023-12-26T08:17:16.951Z",
                                    "sessionId": "0fb9a143-8d5b-4c3d-9eb9-165f1f033022"
                                },
                                {
                                    "pkId": 20,
                                    "id": "CEC0806814D16E8EB3D753AFEAA0D39C",
                                    "to": "62*********@s.whatsapp.net",
                                    "message": "jebxxiwiw",
                                    "schedule": "2023-12-26T08:14:54.548Z",
                                    "status": "read",
                                    "createdAt": "2023-12-26T08:14:54.549Z",
                                    "updatedAt": "2023-12-26T08:17:16.907Z",
                                    "sessionId": "0fb9a143-8d5b-4c3d-9eb9-165f1f033022"
                                }
                            ],
                            "metadata": {
                                "totalMessages": 8,
                                "currentPage": 1,
                                "totalPages": 2,
                                "hasMore": true
                            }
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Conversation Messages',
                url: '/messages/:sessionId',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                pathVariables: [templatePathVariable.session],
                queryParams: [
                    {
                        name: 'page',
                        description: 'get messages of current page of pagination'
                    },
                    {
                        name: 'pageSize',
                        description: 'how many messages taken from each page'
                    },
                    {
                        name: 'phoneNumber',
                        description: 'get conversation with this number, must be (country code without +)(number) e.g. 6281234567'
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "data": [
                                {
                                    "pkId": 45,
                                    "id": "130A3944E9C93EE33D6ED2EFDE026B37",
                                    "to": "62********@s.whatsapp.net",
                                    "message": "",
                                    "mediaPath": "images/uploads/130A3944E9C93EE33D6ED2EFDE026B37.jpg",
                                    "schedule": "2023-11-10T08:44:15.228Z",
                                    "status": "read",
                                    "createdAt": "2023-11-10T08:44:15.230Z",
                                    "updatedAt": "2023-11-10T08:44:15.230Z",
                                    "sessionId": "a53d1e5d-60b2-436f-b621-e3d27246b887"
                                },
                                {
                                    "pkId": 82,
                                    "id": "3DD7B15567B828EB4EE155FB0A5C0A44",
                                    "from": "62********@s.whatsapp.net",
                                    "message": "",
                                    "mediaPath": "images/downloads/3DD7B15567B828EB4EE155FB0A5C0A44.jpg",
                                    "receivedAt": "2023-11-10T08:44:57.000Z",
                                    "createdAt": "2023-11-10T08:44:49.935Z",
                                    "updatedAt": "2023-11-10T08:44:49.935Z",
                                    "sessionId": "a53d1e5d-60b2-436f-b621-e3d27246b887"
                                },
                                {
                                    "pkId": 83,
                                    "id": "AC304B9F8AC5EE23F214DCC33B900D95",
                                    "from": "62********@s.whatsapp.net",
                                    "message": "tesss",
                                    "mediaPath": "images/downloads/AC304B9F8AC5EE23F214DCC33B900D95.jpg",
                                    "receivedAt": "2023-11-10T08:55:41.000Z",
                                    "createdAt": "2023-11-11T14:33:03.081Z",
                                    "updatedAt": "2023-11-11T14:33:03.081Z",
                                    "sessionId": "a53d1e5d-60b2-436f-b621-e3d27246b887"
                                },
                                {
                                    "pkId": 85,
                                    "id": "BAE53579DEAADBF7",
                                    "from": "6281295765058@s.whatsapp.net",
                                    "message": "coba kirim lagi",
                                    "mediaPath": "images/downloads/BAE53579DEAADBF7.jpg",
                                    "receivedAt": "2023-11-10T09:22:21.000Z",
                                    "createdAt": "2023-11-11T14:33:03.888Z",
                                    "updatedAt": "2023-11-11T14:33:03.888Z",
                                    "sessionId": "a53d1e5d-60b2-436f-b621-e3d27246b887"
                                },
                                {
                                    "pkId": 46,
                                    "id": "01E1A3B5E60A9952CFB7E8E87D9731E6",
                                    "to": "62********@s.whatsapp.net",
                                    "message": "",
                                    "mediaPath": "images/uploads/01E1A3B5E60A9952CFB7E8E87D9731E6.jpg",
                                    "schedule": "2023-11-11T14:33:05.700Z",
                                    "status": "read",
                                    "createdAt": "2023-11-11T14:33:05.704Z",
                                    "updatedAt": "2023-11-11T14:33:05.704Z",
                                    "sessionId": "a53d1e5d-60b2-436f-b621-e3d27246b887"
                                },
                                {
                                    "pkId": 47,
                                    "id": "BAE53A5335432C33",
                                    "to": "62********@s.whatsapp.net",
                                    "message": "4mb",
                                    "mediaPath": "images/uploads/BAE53A5335432C33.jpg",
                                    "schedule": "2023-11-11T14:33:06.547Z",
                                    "status": "read",
                                    "createdAt": "2023-11-11T14:33:06.551Z",
                                    "updatedAt": "2023-11-11T14:33:06.551Z",
                                    "sessionId": "a53d1e5d-60b2-436f-b621-e3d27246b887"
                                },
                                {
                                    "pkId": 48,
                                    "id": "BAE5E4C3BA246511",
                                    "to": "62********@s.whatsapp.net",
                                    "message": "4mb",
                                    "mediaPath": "images/uploads/BAE5E4C3BA246511.jpg",
                                    "schedule": "2023-11-11T14:33:07.538Z",
                                    "status": "read",
                                    "createdAt": "2023-11-11T14:33:07.543Z",
                                    "updatedAt": "2023-11-11T14:33:07.543Z",
                                    "sessionId": "a53d1e5d-60b2-436f-b621-e3d27246b887"
                                },
                                {
                                    "pkId": 50,
                                    "id": "BAE55E21E43E4305",
                                    "to": "6281295765058@s.whatsapp.net",
                                    "message": "gambar 4mb dari server",
                                    "mediaPath": "images/uploads/BAE55E21E43E4305.jpg",
                                    "schedule": "2023-11-11T14:33:39.014Z",
                                    "status": "read",
                                    "createdAt": "2023-11-11T14:33:39.019Z",
                                    "updatedAt": "2023-11-11T14:33:39.019Z",
                                    "sessionId": "a53d1e5d-60b2-436f-b621-e3d27246b887"
                                }
                            ],
                            "metadata": {
                                "totalMessages": 15,
                                "currentPage": 1,
                                "totalPages": 1,
                                "hasMore": false
                            }
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get List Messenger',
                url: '/messages/:sessionId/messenger-list',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                pathVariables: [templatePathVariable.session],
                queryParams: [
                    {
                        name: 'page',
                        description: 'get messages of current page of pagination'
                    },
                    {
                        name: 'pageSize',
                        description: 'how many messages taken from each page'
                    },
                    {
                        name: 'sort',
                        description: 'sort asc or desc'
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "data": [
                                {
                                    "phone": "62******",
                                    "createdAt": "2023-12-06T03:46:03.680Z",
                                    "contact": {
                                        "pkId": 404,
                                        "id": "337b7e2c-63aa-4388-9586-ae5a8182bd54",
                                        "firstName": "Nomor",
                                        "lastName": "di Kontak",
                                        "phone": "62******",
                                        "email": "kucing@gmail.com",
                                        "gender": "male",
                                        "dob": "2009-12-18T00:00:00.000Z",
                                        "colorCode": "16ED8A",
                                        "createdAt": "2023-12-06T03:47:26.951Z",
                                        "updatedAt": "2023-12-06T03:47:26.951Z"
                                    }
                                },
                                {
                                    "phone": "62*******",
                                    "createdAt": "2023-12-06T03:45:01.894Z"
                                },
                                {
                                    "phone": "62******",
                                    "createdAt": "2023-12-06T03:44:41.878Z"
                                }
                            ],
                            "metadata": {
                                "totalMessages": 3,
                                "currentPage": 1,
                                "totalPages": 1,
                                "hasMore": false
                            }
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Send Messages',
                url: '/messages/:sessionId/send',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                pathVariables: [templatePathVariable.session],
                jsonSampleRequests: [
                    [
                        {
                            "recipient": "62xxxxxxxxxx",
                            "message": {
                                "text": "Halo, Sample! 🤩"
                            }
                        },
                        {
                            "recipient": "62xxxxxxxxxx",
                            "message": {
                                "text": "Halo, Sample2! 🤩"
                            }
                        },
                        {
                            "recipient": "62xxxxxxxxxx",
                            "message": {
                                "text": "Halo, Sample3! 🤩"
                            }
                        },
                        {
                            "recipient": "62xxxxxxxxxx",
                            "message": {
                                "text": "Halo, Sample4! 🤩"
                            }
                        },
                        {
                            "recipient": "62xxxxxxxxxx",
                            "message": {
                                "text": "Halo, Sample5! 🤩"
                            }
                        }
                    ]
                ],
                sampleResponses: [
                    {
                        response: {
                            "results": [
                                {
                                    "index": 0,
                                    "result": {
                                        "key": {
                                            "remoteJid": "62xxxxxxxxxx@s.whatsapp.net",
                                            "fromMe": true,
                                            "id": "BAE5ECA07F847454"
                                        },
                                        "message": {
                                            "extendedTextMessage": {
                                                "text": "Halo, Amri! 🤩"
                                            }
                                        },
                                        "messageTimestamp": "1696571697",
                                        "status": "PENDING"
                                    }
                                }
                            ],
                            "errors": []
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Send Image Messages',
                url: '/messages/:sessionId/send/image',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.formdata],
                type: 'formdata',
                pathVariables: [templatePathVariable.session],
                formDataSampleRequests: [
                    {
                        key: 'caption',
                        value: 'Contoh caption'
                    },
                    {
                        key: 'image',
                        value: 'your_image_data'
                    },
                    {
                        key: 'delay',
                        value: '5000 (in ms)'
                    },
                    {
                        key: 'recipients[0]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[1]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[2]',
                        value: '62xxxxxx (and so on)'
                    },
                ],
                sampleResponses: [
                    {
                        response: {
                            "results": [
                                {
                                    "index": 3,
                                    "result": {
                                        "key": {
                                            "remoteJid": "62xxxxxxxxxx@s.whatsapp.net",
                                            "fromMe": true,
                                            "id": "BAE5B3073CCDEF69"
                                        },
                                        "message": {
                                            "imageMessage": {
                                                "url": "https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m233/up-oil-image-3f0730f0-92d5-46a8-81e8-e8c143e197b1?ccb=9-4&oh=01_AdTqFJMipMl8Z6_G43VdjtV99-ui94W4zJqx7A7LUnL7oQ&oe=6547157A&_nc_sid=000000&mms3=true",
                                                "mimetype": "image/jpeg",
                                                "caption": "Pakai Cicilan 0%, OPPO A58 langsung di tangan 🤳🏻\n\nGanti HP baru bayar jadi lebih ringan pakai GoPay Later di Tokopedia! Bisa cicilan 0% tanpa biaya lain-lain.\n\nCus, langsung di-aktivasi sebelum promonya berakhir.\nSayang banget kalo sampai di-skip!",
                                                "fileSha256": "aGWdQoqLW4eoOcKkW67WznAxMPDZiWy9SiVxdXNUfxA=",
                                                "fileLength": "64156",
                                                "height": 540,
                                                "width": 1080,
                                                "mediaKey": "VWxBa79ZSvguSpdaIK/rQc7ZUFXt44ng+ynPs4gx8vw=",
                                                "fileEncSha256": "TjswKRoTkfcp240ggowBtN1prQlYyS2hpEoxrucVlss=",
                                                "directPath": "/o1/v/t62.7118-24/f1/m233/up-oil-image-3f0730f0-92d5-46a8-81e8-e8c143e197b1?ccb=9-4&oh=01_AdTqFJMipMl8Z6_G43VdjtV99-ui94W4zJqx7A7LUnL7oQ&oe=6547157A&_nc_sid=000000",
                                                "mediaKeyTimestamp": "1696571328",
                                                "jpegThumbnail": "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAQACADASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAwIEBQb/xAAkEAACAQMDAwUAAAAAAAAAAAABAgMABBESITETQVEFUmGhsf/EABYBAQEBAAAAAAAAAAAAAAAAAAQCA//EABsRAAICAwEAAAAAAAAAAAAAAAECAAMRQXEh/9oADAMBAAIRAxEAPwDoLhm6raZZFAGSqqDUgwIADAnHnejurMTSliEIPuUntjzRpaGNw46QYHkIe/PekiZGHc3og9SsLQxahdOVL6safFNJbzGNZEnXB5XQNvurUcMLy28jwq0kbnQ5G68ZrPkd4IkZHLO+SqgfP5R7bHRgV9G+S66haCucHXZ//9k="
                                            }
                                        },
                                        "messageTimestamp": "1696571328",
                                        "status": "PENDING"
                                    }
                                },
                                {
                                    "index": 4,
                                    "result": {
                                        "key": {
                                            "remoteJid": "62xxxxxxxxxx@s.whatsapp.net",
                                            "fromMe": true,
                                            "id": "BAE542D65CD49B96"
                                        },
                                        "message": {
                                            "imageMessage": {
                                                "url": "https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m231/up-oil-image-e0d3bbed-958c-40f1-a7ca-bd9951c23b3d?ccb=9-4&oh=01_AdQ6ioytBZuSR5mCfuQ4u0ItjteYoP4lqKOirXGLqBf-4g&oe=654703C3&_nc_sid=000000&mms3=true",
                                                "mimetype": "image/jpeg",
                                                "caption": "Pakai Cicilan 0%, OPPO A58 langsung di tangan 🤳🏻\n\nGanti HP baru bayar jadi lebih ringan pakai GoPay Later di Tokopedia! Bisa cicilan 0% tanpa biaya lain-lain.\n\nCus, langsung di-aktivasi sebelum promonya berakhir.\nSayang banget kalo sampai di-skip!",
                                                "fileSha256": "aGWdQoqLW4eoOcKkW67WznAxMPDZiWy9SiVxdXNUfxA=",
                                                "fileLength": "64156",
                                                "height": 540,
                                                "width": 1080,
                                                "mediaKey": "5BZTgnlE8MGAUp0/OPLWGoLerVG1AXe0axeHvcsz1BI=",
                                                "fileEncSha256": "9cR9+SfiFdkMkFIHGNGxWzTfpKc/+lmxW7KfgClBaDg=",
                                                "directPath": "/o1/v/t62.7118-24/f1/m231/up-oil-image-e0d3bbed-958c-40f1-a7ca-bd9951c23b3d?ccb=9-4&oh=01_AdQ6ioytBZuSR5mCfuQ4u0ItjteYoP4lqKOirXGLqBf-4g&oe=654703C3&_nc_sid=000000",
                                                "mediaKeyTimestamp": "1696571330",
                                                "jpegThumbnail": "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAQACADASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAwIEBQb/xAAkEAACAQMDAwUAAAAAAAAAAAABAgMABBESITETQVEFUmGhsf/EABYBAQEBAAAAAAAAAAAAAAAAAAQCA//EABsRAAICAwEAAAAAAAAAAAAAAAECAAMRQXEh/9oADAMBAAIRAxEAPwDoLhm6raZZFAGSqqDUgwIADAnHnejurMTSliEIPuUntjzRpaGNw46QYHkIe/PekiZGHc3og9SsLQxahdOVL6safFNJbzGNZEnXB5XQNvurUcMLy28jwq0kbnQ5G68ZrPkd4IkZHLO+SqgfP5R7bHRgV9G+S66haCucHXZ//9k="
                                            }
                                        },
                                        "messageTimestamp": "1696571330",
                                        "status": "PENDING"
                                    }
                                }
                            ],
                            "errors": [
                                {
                                    "index": 0,
                                    "error": "Cannot read properties of undefined (reading 'includes')"
                                },
                                {
                                    "index": 1,
                                    "error": "Cannot read properties of undefined (reading 'includes')"
                                },
                                {
                                    "index": 2,
                                    "error": "Cannot read properties of undefined (reading 'includes')"
                                }
                            ]
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Send Document Messages',
                url: '/messages/:sessionId/send/doc',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.formdata],
                type: 'formdata',
                pathVariables: [templatePathVariable.session],
                formDataSampleRequests: [
                    {
                        key: 'caption',
                        value: 'Contoh caption'
                    },
                    {
                        key: 'document',
                        value: 'your_document_data'
                    },
                    {
                        key: 'delay',
                        value: '5000 (in ms)'
                    },
                    {
                        key: 'recipients[0]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[1]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[2]',
                        value: '62xxxxxx (and so on)'
                    },
                ],
                sampleResponses: [
                    {
                        response: {
                            "results": [
                                {
                                    "index": 0,
                                    "result": {
                                        "key": {
                                            "remoteJid": "6281295765058@s.whatsapp.net",
                                            "fromMe": true,
                                            "id": "BAE539F72861A7B4"
                                        },
                                        "message": {
                                            "documentMessage": {
                                                "url": "https://mmg.whatsapp.net/v/t62.7119-24/13813557_1492689338237959_7080216875408618555_n.enc?ccb=11-4&oh=01_AdS8GhhC46rwgvftz9nSExoe5GqwZSd5iamUf-SCVr5UYw&oe=6572B679&_nc_sid=5e03e0&mms3=true",
                                                "mimetype": "application/pdf",
                                                "fileSha256": "ff3f/Ars4tQH6DjpItH4DgUvD5zGLclHQqmrDgufULA=",
                                                "fileLength": "59155",
                                                "mediaKey": "fMr+u+nurlDjla0zZCgKVdPjSsaf2ovbyxz2nzX0c88=",
                                                "fileName": "document-1699432627101-559283207.pdf",
                                                "fileEncSha256": "nGXUI0Cns6xPjf/kDvEtWqv9v8zvEyglmkabZmcTOV8=",
                                                "directPath": "/v/t62.7119-24/13813557_1492689338237959_7080216875408618555_n.enc?ccb=11-4&oh=01_AdS8GhhC46rwgvftz9nSExoe5GqwZSd5iamUf-SCVr5UYw&oe=6572B679&_nc_sid=5e03e0",
                                                "mediaKeyTimestamp": "1699432633",
                                                "caption": "*TEST PDF*"
                                            }
                                        },
                                        "messageTimestamp": "1699432633",
                                        "status": "PENDING"
                                    }
                                },
                                {
                                    "index": 1,
                                    "result": {
                                        "key": {
                                            "remoteJid": "6281357995175@s.whatsapp.net",
                                            "fromMe": true,
                                            "id": "BAE5021662703D36"
                                        },
                                        "message": {
                                            "documentMessage": {
                                                "url": "https://mmg.whatsapp.net/v/t62.7119-24/13971895_880259483496256_1167506153989416023_n.enc?ccb=11-4&oh=01_AdRk0NXnFDOhbsiNo80EOuuftb22ygJa-IKi8geoJjlIYA&oe=6572C17E&_nc_sid=5e03e0&mms3=true",
                                                "mimetype": "application/pdf",
                                                "fileSha256": "ff3f/Ars4tQH6DjpItH4DgUvD5zGLclHQqmrDgufULA=",
                                                "fileLength": "59155",
                                                "mediaKey": "i1AK5T108qNuBBZ108LQk6q6K/2lY8mIJt09ZYEQtKk=",
                                                "fileName": "document-1699432627101-559283207.pdf",
                                                "fileEncSha256": "L9ONK2R2lFYGA3wLCSRy2PQMLmAcU+3D/le7BfnEIj0=",
                                                "directPath": "/v/t62.7119-24/13971895_880259483496256_1167506153989416023_n.enc?ccb=11-4&oh=01_AdRk0NXnFDOhbsiNo80EOuuftb22ygJa-IKi8geoJjlIYA&oe=6572C17E&_nc_sid=5e03e0",
                                                "mediaKeyTimestamp": "1699432634",
                                                "caption": "*TEST PDF*"
                                            }
                                        },
                                        "messageTimestamp": "1699432634",
                                        "status": "PENDING"
                                    }
                                },
                                {
                                    "index": 2,
                                    "result": {
                                        "key": {
                                            "remoteJid": "6285856343774@s.whatsapp.net",
                                            "fromMe": true,
                                            "id": "BAE59C34CCC07C45"
                                        },
                                        "message": {
                                            "documentMessage": {
                                                "url": "https://mmg.whatsapp.net/v/t62.7119-24/32731644_345272304851038_494003235187149061_n.enc?ccb=11-4&oh=01_AdS7qygm_PfZnjSJXij5Bkjpp6ne2e0ZguTH8lX5wzxtXA&oe=6572AE58&_nc_sid=5e03e0&mms3=true",
                                                "mimetype": "application/pdf",
                                                "fileSha256": "ff3f/Ars4tQH6DjpItH4DgUvD5zGLclHQqmrDgufULA=",
                                                "fileLength": "59155",
                                                "mediaKey": "ahA3PRcuqv67Ft4RFY3atjF9BlQGAYeabRWCR2jyEdc=",
                                                "fileName": "document-1699432627101-559283207.pdf",
                                                "fileEncSha256": "WtCeixEZnc7iG8gF080dJ9r65Ueqp9qOyZLrgNNxxdw=",
                                                "directPath": "/v/t62.7119-24/32731644_345272304851038_494003235187149061_n.enc?ccb=11-4&oh=01_AdS7qygm_PfZnjSJXij5Bkjpp6ne2e0ZguTH8lX5wzxtXA&oe=6572AE58&_nc_sid=5e03e0",
                                                "mediaKeyTimestamp": "1699432636",
                                                "caption": "*TEST PDF*"
                                            }
                                        },
                                        "messageTimestamp": "1699432636",
                                        "status": "PENDING"
                                    }
                                }
                            ],
                            "errors": []
                        },
                        status: 200
                    },
                ]
            },
        ]
    },
    {
        group: 'Auto Replies',
        apiList: [
            {
                name: 'Get Auto Replies',
                url: '/auto-replies',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            {
                                "id": "ae2a824d-6060-4e01-a6bd-f956dcc5262a",
                                "name": "TANYA KABAR",
                                "status": true,
                                "recipients": [
                                    "*"
                                ],
                                "device": {
                                    "name": "Device 999"
                                },
                                "createdAt": "2023-11-07T04:32:48.968Z",
                                "updatedAt": "2023-11-07T04:32:48.968Z"
                            },
                            {
                                "id": "9be0c203-1853-47cf-8c72-2b3a46229c95",
                                "name": "TANYA KABAR",
                                "status": true,
                                "recipients": [
                                    "628885955383"
                                ],
                                "device": {
                                    "name": "Device 55"
                                },
                                "createdAt": "2023-11-07T04:52:36.656Z",
                                "updatedAt": "2023-11-07T04:52:36.656Z"
                            }
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Auto Reply',
                url: '/auto-replies/:autoReplyId',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.autoReply],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "id": "2d3bfebe-d07b-45c3-981f-e78c67c8838d",
                            "name": "TANYA KABAR",
                            "recipients": [
                                "628885955383",
                                "6289524044800"
                            ],
                            "requests": [
                                "san"
                            ],
                            "mediaPath": "media\\D618a8d55-77a2-4300-9b04-a5b9c91dc8de\\1700304245350-623728714.xlsx",
                            "response": "ya coy, {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}!"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Auto Reply Recipients',
                url: '/auto-replies/:autoReplyId/recipients',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.autoReply],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            {
                                "firstName": "Siti",
                                "lastName": "Mahmudah",
                                "phone": "628885955383",
                                "ContactLabel": [
                                    {
                                        "label": {
                                            "name": "contact label 1"
                                        }
                                    },
                                    {
                                        "label": {
                                            "name": "contact label 2"
                                        }
                                    },
                                    {
                                        "label": {
                                            "name": "contact label 3"
                                        }
                                    }
                                ]
                            },
                            {
                                "firstName": "Amri",
                                "lastName": null,
                                "phone": "628885955383",
                                "ContactLabel": []
                            }
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Auto Reply Recipients',
                url: '/auto-replies/:autoReplyId/recipients',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.autoReply],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            {
                                "firstName": "Siti",
                                "lastName": "Mahmudah",
                                "phone": "628885955383",
                                "ContactLabel": [
                                    {
                                        "label": {
                                            "name": "contact label 1"
                                        }
                                    },
                                    {
                                        "label": {
                                            "name": "contact label 2"
                                        }
                                    },
                                    {
                                        "label": {
                                            "name": "contact label 3"
                                        }
                                    }
                                ]
                            },
                            {
                                "firstName": "Amri",
                                "lastName": null,
                                "phone": "628885955383",
                                "ContactLabel": []
                            }
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Create Auto Reply',
                url: '/auto-replies/',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.formdata],
                type: 'formdata',
                formDataSampleRequests: [
                    {
                        key: 'name',
                        value: 'Auto Reply Example Name'
                    },
                    {
                        key: 'deviceId',
                        value: 'f96d5788-5d56-4e55-81aa-8c8decd58878'
                    },
                    {
                        key: 'response',
                        value: 'ya coy, {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}!'
                    },
                    {
                        key: 'request[0]',
                        value: 'hello (message keyword to trigger auto reply)'
                    },
                    {
                        key: 'request[1]',
                        value: 'hi'
                    },
                    {
                        key: 'request[2]',
                        value: 'halo (and so on)'
                    },
                    {
                        key: 'media',
                        value: 'your_media_file_data'
                    },
                    {
                        key: 'recipients[0]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[1]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[2]',
                        value: '62xxxxxx (and so on)'
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "pkId": 11,
                            "id": "af09bb84-f141-4b9b-beec-b2155a59a017",
                            "name": "TANYA KABAR",
                            "requests": [
                                "san"
                            ],
                            "response": "ya coy, {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}!",
                            "status": true,
                            "recipients": [
                                "628885955383",
                                "6289524044800"
                            ],
                            "mediaPath": ".tmp\\image-1700195818181-769351146.pdf",
                            "createdAt": "2023-11-17T04:36:58.213Z",
                            "updatedAt": "2023-11-17T04:36:58.213Z",
                            "deviceId": 1
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Auto Reply',
                url: '/auto-replies/:autoReplyId',
                method: 'PUT',
                headers: [...bothTokenHeader, templateHeaders.formdata],
                pathVariables: [templatePathVariable.autoReply],
                type: 'formdata',
                formDataSampleRequests: [
                    {
                        key: 'name',
                        value: 'Auto Reply Example Name'
                    },
                    {
                        key: 'deviceId',
                        value: 'f96d5788-5d56-4e55-81aa-8c8decd58878'
                    },
                    {
                        key: 'response',
                        value: 'ya coy, {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}!'
                    },
                    {
                        key: 'request[0]',
                        value: 'hello (message keyword to trigger auto reply)'
                    },
                    {
                        key: 'request[1]',
                        value: 'hi'
                    },
                    {
                        key: 'request[2]',
                        value: 'halo (and so on)'
                    },
                    {
                        key: 'media',
                        value: 'your_media_file_data'
                    },
                    {
                        key: 'recipients[0]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[1]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[2]',
                        value: '62xxxxxx (and so on)'
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "pkId": 28,
                            "id": "2d3bfebe-d07b-45c3-981f-e78c67c8838d",
                            "name": "TANYA KABAR",
                            "requests": [
                                "san"
                            ],
                            "response": "ya coy, {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}!",
                            "status": true,
                            "recipients": [
                                "628885955383",
                                "6289524044800"
                            ],
                            "mediaPath": "media\\D618a8d55-77a2-4300-9b04-a5b9c91dc8de\\1700304245350-623728714.xlsx",
                            "createdAt": "2023-11-18T00:15:09.447Z",
                            "updatedAt": "2023-11-18T10:44:05.354Z",
                            "deviceId": 2
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Auto Reply Status',
                url: '/auto-replies/:autoReplyId/status',
                method: 'PATCH',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                pathVariables: [templatePathVariable.autoReply],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "status": false
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "pkId": 1,
                            "id": "bb1190de-463b-4e01-b1c5-f7d126d953c5",
                            "name": "TANYA KABAR",
                            "requests": [
                                "san"
                            ],
                            "response": "ya coy, {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}!",
                            "status": true,
                            "recipients": [
                                "628885955383"
                            ],
                            "mediaPath": null,
                            "createdAt": "2023-12-06T08:16:40.572Z",
                            "updatedAt": "2023-12-06T08:17:52.286Z",
                            "deviceId": 3
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Delete Auto Replies',
                url: '/auto-replies',
                method: 'DELETE',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "autoReplyIds": ["a2c59d32-25af-4c71-8de8-d0f13b0eb7c7", "8045c321-5d27-4d87-ae22-d74281c2b2b7"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Auto-rep(s) deleted successfully"
                        },
                        status: 200
                    },
                ]
            },
        ]
    },
    {
        group: 'Broadcast',
        apiList: [
            {
                name: 'Create Broadcast',
                url: '/broadcasts',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.formdata],
                type: 'formdata',
                formDataSampleRequests: [
                    {
                        key: 'name',
                        value: 'Broadcast Example Name'
                    },
                    {
                        key: 'deviceId',
                        value: 'f96d5788-5d56-4e55-81aa-8c8decd58878'
                    },
                    {
                        key: 'message',
                        value: 'ya coy, {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}!'
                    },
                    {
                        key: 'delay',
                        value: '5000'
                    },
                    {
                        key: 'schedule',
                        value: '2023-10-31T07:29:22+00:00'
                    },
                    {
                        key: 'media',
                        value: 'your_media_file_data'
                    },
                    {
                        key: 'recipients[0]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[1]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[2]',
                        value: '62xxxxxx (and so on)'
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Broadcast created successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Broadcasts',
                url: '/broadcasts',
                method: 'GET',
                headers: [...bothTokenHeader],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            {
                                "id": "665ab096-1407-4850-8b6f-90702cc1a14a",
                                "name": "BISAKAH",
                                "status": true,
                                "device": {
                                    "name": "Device 999"
                                },
                                "createdAt": "2023-11-08T09:34:20.424Z",
                                "updatedAt": "2023-11-08T13:44:00.747Z"
                            }
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Broadcast Detail',
                url: '/broadcasts/:broadcastId',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.broadcast],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "id": "665ab096-1407-4850-8b6f-90702cc1a14a",
                            "name": "BISAKAH",
                            "status": true,
                            "recipients": [
                                "628885955383"
                            ],
                            "device": {
                                "name": "Device 999"
                            },
                            "schedule": "2023-10-31T07:29:22.000Z",
                            "message": "ilwir bund"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Outgoing Broadcasts',
                url: '/broadcasts/:broadcastId/outgoing',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.broadcast],
                queryParams: [
                    {
                        name: 'status',
                        description: 'message status (delivery_ack, read, etc)'
                    }
                ],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "outgoingBroadcasts": [
                                {
                                    "pkId": 64,
                                    "id": "BC_1_1699945320017",
                                    "to": "628885955383@s.whatsapp.net",
                                    "message": "pesan ini dikirim lewat broadcast forwardin",
                                    "mediaPath": null,
                                    "schedule": "2023-11-14T07:02:00.815Z",
                                    "status": "delivery_ack",
                                    "createdAt": "2023-11-14T07:02:00.816Z",
                                    "updatedAt": "2023-11-14T07:02:00.816Z",
                                    "sessionId": "5fc3d124-0235-4795-ba87-02b5719a8fee",
                                    "contactId": 2,
                                    "contact": {
                                        "firstName": "Gajah",
                                        "lastName": "Mada",
                                        "phone": "628885955383",
                                        "ContactLabel": [
                                            {
                                                "label": {
                                                    "name": "contact label 1"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 2"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 3"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Outgoing Replies',
                url: '/broadcasts/:broadcastId/replies',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.broadcast],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "broadcastReplies": [
                                {
                                    "contact": {
                                        "firstName": "Siti",
                                        "lastName": "Mahmudah",
                                        "phone": "628885955383",
                                        "ContactLabel": [
                                            {
                                                "label": {
                                                    "name": "contact label 1"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 2"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 3"
                                                }
                                            }
                                        ]
                                    },
                                    "createdAt": "2023-11-08T14:03:07.216Z"
                                }
                            ]
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Broadcast',
                url: '/broadcasts/:broadcastId',
                method: 'PUT',
                headers: [...bothTokenHeader, templateHeaders.formdata],
                pathVariables: [templatePathVariable.broadcast],
                type: 'formdata',
                formDataSampleRequests: [
                    {
                        key: 'name',
                        value: 'Broadcast Example Name'
                    },
                    {
                        key: 'deviceId',
                        value: 'f96d5788-5d56-4e55-81aa-8c8decd58878'
                    },
                    {
                        key: 'message',
                        value: 'ya coy, {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}!'
                    },
                    {
                        key: 'delay',
                        value: '5000'
                    },
                    {
                        key: 'schedule',
                        value: '2023-10-31T07:29:22+00:00'
                    },
                    {
                        key: 'media',
                        value: 'your_media_file_data'
                    },
                    {
                        key: 'recipients[0]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[1]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[2]',
                        value: '62xxxxxx (and so on)'
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Broadcast updated successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Delete Broadcast',
                url: '/broadcasts',
                method: 'DELETE',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [{
                    "broadcastIds": ["911e1891-1d8e-4efb-aaf3-19d3f892c501", "f1217824-2009-4a0e-a61e-ed0c26049ea5"]
                }],
                sampleResponses: [
                    {
                        response: {
                            "message": "Broadcast(s) deleted successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Broadcast Status',
                url: '/broadcasts/:broadcastId/status',
                method: 'PATCH',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                pathVariables: [templatePathVariable.broadcast],
                type: 'json',
                jsonSampleRequests: [{
                    "status": false
                }],
                sampleResponses: [
                    {
                        response: {
                            "pkId": 1,
                            "id": "bc395513-c7fd-4b47-982b-00390888ffb1",
                            "name": "bc 6",
                            "status": false,
                            "recipients": [
                                "628885955383"
                            ],
                            "message": "hadirin yang berbahagia {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}} 🥲",
                            "schedule": "2023-10-31T07:29:22.000Z",
                            "delay": 3000,
                            "isSent": true,
                            "mediaPath": "media\\D00cdab90-a2e7-406d-af3b-a61e207066d7\\1703233669329-8305949.jfif",
                            "deviceId": 1,
                            "createdAt": "2023-12-22T08:27:49.339Z",
                            "updatedAt": "2023-12-22T08:28:59.607Z"
                        },
                        status: 200
                    },
                ]
            },
        ]
    },
    {
        group: 'Campaign',
        apiList: [
            {
                name: 'Create Campaign',
                url: '/campaigns',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.formdata],
                type: 'formdata',
                formDataSampleRequests: [
                    {
                        key: 'name',
                        value: 'Campaign Example Name'
                    },
                    {
                        key: 'deviceId',
                        value: 'f96d5788-5d56-4e55-81aa-8c8decd58878'
                    },
                    {
                        key: 'delay',
                        value: '5000'
                    },
                    {
                        key: 'schedule',
                        value: '2023-10-31T07:29:22+00:00'
                    },
                    {
                        key: 'media',
                        value: 'your_media_file_data'
                    },
                    {
                        key: 'registrationSyntax',
                        value: 'REGIS#12 (or whatever you like)'
                    },
                    {
                        key: 'unregistrationSyntax',
                        value: 'UNREG#12'
                    },
                    {
                        key: 'registrationMessage',
                        value: 'first message to be shown'
                    },
                    {
                        key: 'successMessage',
                        value: 'message when recipient is registering'
                    },
                    {
                        key: 'failedMessage',
                        value: 'message when recipient is failed at registering'
                    },
                    {
                        key: 'unregisteredMessage',
                        value: 'message when recipient is unregister'
                    },
                    {
                        key: 'recipients[0]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[1]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[2]',
                        value: '62xxxxxx (and so on)'
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Campaign created successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Campaigns',
                url: '/campaigns',
                method: 'GET',
                headers: [...bothTokenHeader],
                queryParams: [
                    {
                        name: 'deviceId',
                        description: ''
                    }
                ],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            {
                                "id": "355b3ade-c724-4734-9268-85ceac201944",
                                "name": "CP_TEST",
                                "status": true,
                                "recipients": [
                                    "*"
                                ],
                                "registrationSyntax": "REG123",
                                "device": {
                                    "name": "Earth"
                                },
                                "createdAt": "2023-12-12T06:22:31.290Z",
                                "updatedAt": "2023-12-12T07:21:13.418Z",
                                "group": {
                                    "_count": {
                                        "contactGroups": 2
                                    }
                                }
                            }
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Campaign Detail',
                url: '/campaigns/:campaignId',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.campaign],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "id": "f40a237e-25c8-4d47-bd13-41969e5349f1",
                            "name": "Campaign Buat CP Message",
                            "schedule": "2023-11-20T02:15:00.000Z",
                            "recipients": [
                                "all"
                            ],
                            "mediaPath": "media/Dundefined/1700471712185-664229304.png",
                            "unregistrationSyntax": "UNREG#12",
                            "registrationSyntax": "REG#12",
                            "registrationMessage": "Subscribe dong, {{$firstName}}. Subscribe REG#12, unsubscribe UNREG#12",
                            "successMessage": "Berhasil subscribe, {{$firstName}} {{$lastName}}",
                            "failedMessage": "Gagal subscribe",
                            "unregisteredMessage": "unsubscribe",
                            "device": {
                                "name": "test"
                            }
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Outgoing Campaign',
                url: '/campaigns/:campaignId/outgoing',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.campaign],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "outgoingCampaigns": [
                                {
                                    "pkId": 70,
                                    "id": "CP_3_1700200920030",
                                    "to": "628885955383@s.whatsapp.net",
                                    "message": "gaslah join campaign campaign kuy kami dengan cara balas pesan ini dengan format: MAU#121. Kalau mau unsub pake UNREG#121 (bales dong  Amri Mada 628885955383 kucing@gmail.com~)",
                                    "mediaPath": "media/6498f02d-d228-4e38-8f87-a3e185191ae3/CP_3_1700200920030.jpeg",
                                    "schedule": "2023-11-17T06:02:01.708Z",
                                    "status": "read",
                                    "createdAt": "2023-11-17T06:02:01.709Z",
                                    "updatedAt": "2023-11-17T06:02:01.709Z",
                                    "sessionId": "6498f02d-d228-4e38-8f87-a3e185191ae3",
                                    "contactId": 7,
                                    "contact": {
                                        "firstName": "Amri",
                                        "lastName": "Mada",
                                        "phone": "628885955383",
                                        "colorCode": "8AA308",
                                        "ContactLabel": [
                                            {
                                                "label": {
                                                    "name": "contact label 1"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 2"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 3"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Campaign Replies',
                url: '/campaigns/:campaignId/replies',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.campaign],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "campaignReplies": [
                                {
                                    "contact": {
                                        "firstName": "A",
                                        "lastName": "M",
                                        "phone": "628885955383",
                                        "ContactLabel": [
                                            {
                                                "label": {
                                                    "name": "contact label 1"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 2"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 3"
                                                }
                                            }
                                        ]
                                    },
                                    "createdAt": "2023-11-09T08:52:35.112Z"
                                }
                            ]
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Campaign',
                url: '/campaigns/:campaignId',
                method: 'PUT',
                headers: [...bothTokenHeader, templateHeaders.formdata],
                pathVariables: [
                    templatePathVariable.campaign
                ],
                type: 'formdata',
                formDataSampleRequests: [
                    {
                        key: 'name',
                        value: 'Campaign Example Name'
                    },
                    {
                        key: 'deviceId',
                        value: 'f96d5788-5d56-4e55-81aa-8c8decd58878'
                    },
                    {
                        key: 'delay',
                        value: '5000'
                    },
                    {
                        key: 'schedule',
                        value: '2023-10-31T07:29:22+00:00'
                    },
                    {
                        key: 'media',
                        value: 'your_media_file_data'
                    },
                    {
                        key: 'registrationSyntax',
                        value: 'REGIS#12 (or whatever you like)'
                    },
                    {
                        key: 'unregistrationSyntax',
                        value: 'UNREG#12'
                    },
                    {
                        key: 'registrationMessage',
                        value: 'first message to be shown'
                    },
                    {
                        key: 'successMessage',
                        value: 'message when recipient is registering'
                    },
                    {
                        key: 'failedMessage',
                        value: 'message when recipient is failed at registering'
                    },
                    {
                        key: 'unregisteredMessage',
                        value: 'message when recipient is unregister'
                    },
                    {
                        key: 'recipients[0]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[1]',
                        value: '62xxxxxx'
                    },
                    {
                        key: 'recipients[2]',
                        value: '62xxxxxx (and so on)'
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "mmessage": "Campaign updated successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Delete Campaigns',
                url: '/campaigns',
                method: 'DELETE',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [{
                    "campaignIds": ["e3536f4a-35f5-43ef-952d-a5f17d519778", "faa9eef1-3821-45bb-aec1-04e9b124ba3d"]
                }],
                sampleResponses: [
                    {
                        response: {
                            "message": "Campaign(s) deleted successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Campaign Status',
                url: '/campaigns/:campaignId/status',
                method: 'PATCH',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                pathVariables: [templatePathVariable.campaign],
                type: 'json',
                jsonSampleRequests: [{
                    "status": false
                }],
                sampleResponses: [
                    {
                        response: {
                            "pkId": 1,
                            "id": "76fd9e76-0e12-42ca-97dc-73fd08115168",
                            "name": "campaign kuy",
                            "status": false,
                            "registrationSyntax": "MAU#121",
                            "unregistrationSyntax": "UNREG#121",
                            "registrationMessage": "gaslah join campaign {{$campaignName}} kami dengan cara balas pesan ini dengan format: {{$registrationSyntax}}. Kalau mau unsub pake {{$unregistrationSyntax}} (bales dong  {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}~)",
                            "successMessage": "makasih telah bergabung di campaign {{$campaignName}},  {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}",
                            "failedMessage": "kamu udah terdaftar di campaign {{$campaignName}} ini,  {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}.",
                            "unregisteredMessage": "Sampai jumpa di camaign selanjutnya,  {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}} 🥹",
                            "recipients": [
                                "628885955383"
                            ],
                            "delay": 3000,
                            "isSent": true,
                            "schedule": "2023-10-31T07:29:22.000Z",
                            "mediaPath": "media\\D00cdab90-a2e7-406d-af3b-a61e207066d7\\1703233810892-829441135.png",
                            "groupId": 1,
                            "deviceId": 1,
                            "createdAt": "2023-12-22T08:30:10.905Z",
                            "updatedAt": "2023-12-22T08:35:43.804Z"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Create Campaign Messages',
                url: '/campaigns/messages',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.formdata],
                type: 'formdata',
                formDataSampleRequests: [
                    {
                        key: 'name',
                        value: 'Campaign Message Example Name'
                    },
                    {
                        key: 'campaignId',
                        value: 'f96d5788-5d56-4e55-81aa-8c8decd58878'
                    },
                    {
                        key: 'delay',
                        value: '5000'
                    },
                    {
                        key: 'schedule',
                        value: '2023-10-31T07:29:22+00:00'
                    },
                    {
                        key: 'media',
                        value: 'your_media_file_data'
                    },
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Campaign message created successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Campaign Messages',
                url: '/campaigns/messages/:campaignMessageId',
                method: 'PUT',
                headers: [...bothTokenHeader, templateHeaders.formdata],
                pathVariables: [templatePathVariable.messageCP],
                type: 'formdata',
                formDataSampleRequests: [
                    {
                        key: 'name',
                        value: 'Campaign Message Example Name'
                    },
                    {
                        key: 'campaignId',
                        value: 'f96d5788-5d56-4e55-81aa-8c8decd58878'
                    },
                    {
                        key: 'delay',
                        value: '5000'
                    },
                    {
                        key: 'schedule',
                        value: '2023-10-31T07:29:22+00:00'
                    },
                    {
                        key: 'media',
                        value: 'your_media_file_data'
                    },
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Campaign message created successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Campaign Messages',
                url: '/campaigns/:campaignId/messages',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.campaign],
                type: 'none',
                sampleResponses: [
                    {
                        response: [
                            {
                                "pkId": 4,
                                "id": "83b6b72b-ad9e-413d-8424-d051ab020784",
                                "campaignId": 4,
                                "message": "Quest Special Menuju 1212!: Follow Forwardin on IG: _@forwardin.id_",
                                "delay": 5000,
                                "isSent": false,
                                "schedule": "2023-10-31T07:29:22.000Z",
                                "createdAt": "2023-11-15T03:04:46.494Z",
                                "updatedAt": "2023-11-15T03:04:46.494Z"
                            },
                            {
                                "pkId": 3,
                                "id": "06991f4d-3896-49bd-8689-c0082c6bdf39",
                                "campaignId": 4,
                                "message": "Discount coupon Menuju 1212! #2: *1212-DESEMBERCERIA*",
                                "delay": 5000,
                                "isSent": true,
                                "schedule": "2023-10-31T07:29:22.000Z",
                                "createdAt": "2023-11-15T03:03:44.961Z",
                                "updatedAt": "2023-11-15T03:04:00.017Z"
                            },
                            {
                                "pkId": 1,
                                "id": "01392760-34ce-4a65-a2fc-b726619dba74",
                                "campaignId": 4,
                                "message": "Discount coupon Menuju 1212! #1: *1212-HARBOLNAS*",
                                "delay": 5000,
                                "isSent": true,
                                "schedule": "2023-10-31T07:29:22.000Z",
                                "createdAt": "2023-11-15T03:02:11.175Z",
                                "updatedAt": "2023-11-15T03:03:00.315Z"
                            },
                            {
                                "pkId": 2,
                                "id": "9e1e0c95-76cb-4d1e-9f73-f8eca8ec67c6",
                                "campaignId": 4,
                                "message": "Quest Menuju 1212! #1: Main Cocotki & Dapatkan Koin",
                                "delay": 5000,
                                "isSent": true,
                                "schedule": "2023-10-31T07:29:22.000Z",
                                "createdAt": "2023-11-15T03:03:21.335Z",
                                "updatedAt": "2023-11-15T03:04:00.015Z"
                            }
                        ],
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Campaign Message Detail',
                url: '/campaigns/:campaignId/messages/:campaignMessageId',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.campaign, templatePathVariable.messageCP],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "id": "5d3338cb-b121-46eb-96f2-49d0d0c5c074",
                            "message": "Campaign satu nih bos",
                            "schedule": "2023-10-31T07:29:22.000Z",
                            "Campaign": {
                                "device": {
                                    "name": "Device 999"
                                },
                                "group": {
                                    "contactGroups": [
                                        {
                                            "pkId": 5,
                                            "id": "3d60e70f-876e-44a0-bc2d-95eaac3c69f3",
                                            "contactId": 6,
                                            "groupId": 10
                                        }
                                    ]
                                }
                            }
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Outgoing Campaign Message',
                url: '/campaigns/:campaignId/messages/:campaignMessageId/outgoing',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.campaign, templatePathVariable.messageCP],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "outgoingCampaignMessages": [
                                {
                                    "pkId": 44,
                                    "id": "CPM_1_1700145720045",
                                    "to": "628885955383@s.whatsapp.net",
                                    "message": "Campaign satu nih bos",
                                    "mediaPath": null,
                                    "schedule": "2023-11-16T14:42:00.471Z",
                                    "status": "delivery_ack",
                                    "createdAt": "2023-11-16T14:42:00.473Z",
                                    "updatedAt": "2023-11-16T14:42:00.473Z",
                                    "sessionId": "e418a64f-373b-4d5a-8eb0-ea83ff9185ba",
                                    "contactId": 1,
                                    "contact": {
                                        "firstName": "Gajah",
                                        "lastName": "Mada",
                                        "phone": "628885955383",
                                        "colorCode": "CB0F31",
                                        "ContactLabel": [
                                            {
                                                "label": {
                                                    "name": "contact label 1"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 2"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 3"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Campaign Message Replies',
                url: '/campaigns/:campaignId/messages/:campaignMessageId/replies',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.campaign, templatePathVariable.messageCP],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "campaignMessageReplies": [
                                {
                                    "pkId": 57,
                                    "id": "CBEE8D53CEBB361D98D129B3FAB8EA37",
                                    "from": "628885955383@s.whatsapp.net",
                                    "message": "iyain aja",
                                    "mediaPath": null,
                                    "receivedAt": "2023-11-16T15:17:02.000Z",
                                    "createdAt": "2023-11-16T15:17:00.197Z",
                                    "updatedAt": "2023-11-16T15:17:00.197Z",
                                    "sessionId": "e418a64f-373b-4d5a-8eb0-ea83ff9185ba",
                                    "contactId": 1,
                                    "contact": {
                                        "firstName": "Gajah",
                                        "lastName": "Mada",
                                        "phone": "628885955383",
                                        "colorCode": "CB0F31",
                                        "ContactLabel": [
                                            {
                                                "label": {
                                                    "name": "contact label 1"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 2"
                                                }
                                            },
                                            {
                                                "label": {
                                                    "name": "contact label 3"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Delete Campaign Messages',
                url: '/campaigns/messages',
                method: 'DELETE',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "campaignMessageIds": ["5d3338cb-b121-46eb-96f2-49d0d0c5c074"]
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Campaign message(s) deleted successfully"
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Campaign Messages Status',
                url: '/campaigns/messages/:campaignMessageId/status',
                method: 'PATCH',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                pathVariables: [templatePathVariable.messageCP],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "status": false
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "pkId": 1,
                            "id": "82bac66c-2e2d-45c5-b03a-b5d30ca94cc9",
                            "name": "discount message",
                            "campaignId": 1,
                            "message": "Campaign satu nih bos  {{$firstName}} {{$lastName}} {{$phoneNumber}} {{$email}}",
                            "delay": 1000,
                            "status": false,
                            "isSent": false,
                            "schedule": "2023-10-31T07:29:22.000Z",
                            "mediaPath": null,
                            "createdAt": "2023-12-22T08:36:32.727Z",
                            "updatedAt": "2023-12-22T08:36:58.147Z"
                        },
                        status: 200
                    },
                ]
            },
        ]
    },
    {
        group: 'Business Hours',
        apiList: [
            {
                name: 'Create Business Hours',
                url: '/business-hours',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "message": "We are currently unavailable (mentally and physically)",
                        "monStart": 540, // 9 pagi
                        "monEnd": 1020, // 5 sore
                        "tueStart": 540,
                        "tueEnd": 1020,
                        "wedStart": 540,
                        "wedEnd": 1020,
                        "thuStart": 540,
                        "thuEnd": 1020,
                        "friStart": 540,
                        "friEnd": 1020,
                        "satStart": 540,
                        "satEnd": 1020,
                        "sunStart": 540,
                        "sunEnd": 1020,
                        "timeZone": "Asia/Jakarta",
                        "deviceId": "7128c383-bf1b-4f97-aac8-3e808a344fc2"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "pkId": 2,
                            "id": "7a2c735a-7d30-4d3a-be8c-3a66bf8daefd",
                            "message": "We are currently unavailable (mentally and physically)",
                            "monStart": 540,
                            "monEnd": 1020,
                            "tueStart": 540,
                            "tueEnd": 1020,
                            "wedStart": 540,
                            "wedEnd": 1020,
                            "thuStart": 540,
                            "thuEnd": 1020,
                            "friStart": 540,
                            "friEnd": 1020,
                            "satStart": 1440,
                            "satEnd": 0,
                            "sunStart": 1440,
                            "sunEnd": 0,
                            "timeZone": "Asia/Jakarta",
                            "deviceId": 1
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Update Business Hours',
                url: '/business-hours',
                method: 'PUT',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "message": "We are currently unavailable (mentally and physically)",
                        "monStart": 540, // 9 pagi
                        "monEnd": 1020, // 5 sore
                        "tueStart": 540,
                        "tueEnd": 1020,
                        "wedStart": 540,
                        "wedEnd": 1020,
                        "thuStart": 540,
                        "thuEnd": 1020,
                        "friStart": 540,
                        "friEnd": 1020,
                        "satStart": 540,
                        "satEnd": 1020,
                        "sunStart": 540,
                        "sunEnd": 1020,
                        "timeZone": "Asia/Jakarta",
                        "deviceId": "7128c383-bf1b-4f97-aac8-3e808a344fc2"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "pkId": 2,
                            "id": "7a2c735a-7d30-4d3a-be8c-3a66bf8daefd",
                            "message": "We are currently unavailable (mentally and physically)",
                            "monStart": 540,
                            "monEnd": 1020,
                            "tueStart": 540,
                            "tueEnd": 1020,
                            "wedStart": 540,
                            "wedEnd": 1020,
                            "thuStart": 540,
                            "thuEnd": 1020,
                            "friStart": 540,
                            "friEnd": 1020,
                            "satStart": 1440,
                            "satEnd": 0,
                            "sunStart": 1440,
                            "sunEnd": 0,
                            "timeZone": "Asia/Jakarta",
                            "deviceId": 1
                        },
                        status: 200
                    },
                ]
            },
            {
                name: 'Get Business Hours',
                url: '/business-hours/:deviceId',
                method: 'GET',
                headers: [...bothTokenHeader],
                pathVariables: [templatePathVariable.device],
                type: 'none',
                sampleResponses: [
                    {
                        response: {
                            "pkId": 3,
                            "id": "6a6acd8a-452f-4648-8cb2-29fccb1873cc",
                            "message": "We are currently unavailable (mentally and physically)",
                            "monStart": 1440,
                            "monEnd": 0,
                            "tueStart": 540,
                            "tueEnd": 1020,
                            "wedStart": 540,
                            "wedEnd": 1020,
                            "thuStart": 540,
                            "thuEnd": 1020,
                            "friStart": 540,
                            "friEnd": 1020,
                            "satStart": 1440,
                            "satEnd": 0,
                            "sunStart": 1440,
                            "sunEnd": 0,
                            "timeZone": "Asia/Jakarta",
                            "deviceId": 1
                        },
                        status: 200
                    },
                ]
            },
        ]
    },
    {
        group: 'Order',
        apiList: [
            {
                name: 'Create Order',
                url: '/orders',
                method: 'POST',
                headers: [...bothTokenHeader, templateHeaders.appJSON],
                type: 'json',
                jsonSampleRequests: [
                    {
                        "name": "gibran",
                        "phone": "+629191919",
                        "orderData": "nama: sayur\n kontak:+999\n"
                    }
                ],
                sampleResponses: [
                    {
                        response: {
                            "message": "Order created successfully"
                        },
                        status: 200
                    }
                ]

            }
        ]
    }
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
    queryParams?: {
        name: string,
        description: string
    }[],
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