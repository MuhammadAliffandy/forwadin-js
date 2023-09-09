import bcrypt from 'bcrypt'
const checkPasswordStrength = (password: string) => {

    const strongRegex = {
        eightLength: new RegExp("^(?=.{8,})"),
        lowerCase: new RegExp("^(?=.*[a-z])"),
        upperCase: new RegExp("^(?=.*[A-Z])"),
        numeric: new RegExp("^(?=.*[0-9])"),
        specialChar: new RegExp("^(?=.*[!@#$%^&*])")
    }
    strongRegex.map((validate: RegExp) => {
        if (!validate.test(password))
            return false
    });
    return true
}

const hashPassword = async (password: string) => {
    const hashed_password: string = await bcrypt.hash(password, 10)
    return hashed_password
}
const comparePassword = async (password: string, hash: string) => {
    const result = await bcrypt.compare(password, hash)
    return result
}
export { checkPasswordStrength, hashPassword, comparePassword }