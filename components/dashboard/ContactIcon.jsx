import { getInitials } from "@/utils/helper"


const ContactIcon = ({ contact, phone }) => {

    if (contact) {
        return (
            <>
                <div className="">
                    <div style={{
                        backgroundColor: '#' + contact.colorCode
                    }} className={`flex-none rounded-full text-white w-7 h-7 flex items-center justify-center`}>{getInitials(contact.firstName + ' ' + contact.lastName)}</div>
                </div>
                <p>{contact.firstName} {contact.lastName}</p>
            </>
        )
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