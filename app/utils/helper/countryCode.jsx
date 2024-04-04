import CountryList from 'country-list-with-dial-code-and-flag'
import { PhoneNumberUtil} from 'google-libphonenumber'


CountryList.setPhoneNumberUtil(PhoneNumberUtil.getInstance())

const getCountryList = (code) => {
    if (code)
        return CountryList.findOneByDialCode(code)
    return CountryList.getAll()
}
const formatPhoneCode = (phone, dial_code) => {
    const country = CountryList.findOneByDialCode(dial_code)
    if (country) {
        return country.formatPhoneNumber(phone)
    }
    throw new Error('failed to find country')
}
export { getCountryList, formatPhoneCode }