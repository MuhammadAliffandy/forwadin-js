import { Label } from "@/utils/types"

const ContactLabel = ({
    label,
    onClick,
    idx,
    color = 'primary',
    isBordered = false,
    radius = "full",
    isDisabled = false
}: {
    label: Label,
    idx: number,
    onClick?: () => void,
    color?: 'primary' | 'black' | 'none',
    radius?: 'md' | 'sm' | 'full',
    isBordered?: boolean,
    isDisabled?: boolean
}) => {
    const border = (isBordered ? 'border border-customGray' : '')
    const textColor = (color === 'none' ? 'text-black' : 'text-white')
    if (isDisabled)
        return (
            <div key={idx} className={`flex gap-2 rounded-${radius} px-2 py-[2px] ${textColor} ${border} bg-${color} `}>
                <span className=''> {label.label.name}</span>
                <span>&times;</span>
            </div>
        )
    return (
        <div key={idx} className={`flex gap-2 rounded-${radius} px-2 py-[2px] hover:cursor-pointer ${textColor} ${border} bg-${color} `} onClick={onClick}>
            <span className=''> {label.label.name}</span>
            <span>&times;</span>
        </div>
    )
}

export default ContactLabel