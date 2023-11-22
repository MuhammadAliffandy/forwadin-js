import { Chip } from "@nextui-org/react"

const TabTitle = ({ text, count }: {
    text: string,
    count: number
}) => {
    return (
        <div className="flex gap-2">
            <p>{text}</p>
            <Chip size="sm" variant="faded" radius="sm">{count}</Chip>
        </div>
    )
}

export default TabTitle