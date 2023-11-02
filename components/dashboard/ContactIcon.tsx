import { getInitials } from "@/utils/helper"

interface ContactIconProps {
    contact?: {
        firstName: string,
        lastName: string,
        colorCode: string
    },
    phone: string
}
const ContactIcon = ({ contact, phone }: ContactIconProps) => {
    if (contact) {
        <>
            <div className="">
                <div style={{
                    backgroundColor: '#' + contact?.colorCode
                }} className={`flex-none rounded-full text-white w-7 h-7 flex s-center justify-center`}>{getInitials((contact.firstName + ' ' + contact.lastName))}</div>
            </div>
            <p>{contact.firstName} {contact.lastName}</p>
        </>

    }
    return (
        <>
            <div className="">
                <div className={`flex-none rounded-full text-white w-8 h-8 bg-primary flex items-center justify-center`}>{phone.slice(0, 2)}</div>
            </div>
            <p>-</p>
        </>
    )
}

export default ContactIcon