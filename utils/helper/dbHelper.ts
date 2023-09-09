import prisma from "../db"
interface UserData {
    username: string,
    email: string,
    phone: string
}
const checkUserExist = async ({ username, email, phone }: UserData) => {
    const findUser = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    username: {
                        equals: username
                    }
                },
                {
                    email: {
                        equals: email
                    }
                },
                {
                    phone: {
                        equals: phone
                    }
                }
            ]
        }
    })
    return findUser
}
const findUserByAllParams = async ({ username, email, phone }: UserData) => {
    const findUser = await prisma.user.findFirst({
        where: {
            AND: [
                {
                    username: {
                        equals: username
                    }
                },
                {
                    email: {
                        equals: email
                    }
                },
                {
                    phone: {
                        equals: phone
                    }
                }
            ]
        }
    })
    return findUser
}

export { checkUserExist, findUserByAllParams }