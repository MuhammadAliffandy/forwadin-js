import { Button } from "@nextui-org/react"

interface YesNoButtonProps {
    yesClick: () => void,
    noClick: () => void,
    isLoading: boolean,
    style?: string
}
const YesNoButton = ({ yesClick, noClick, style, isLoading }: YesNoButtonProps) => {
    return (
        <div className={"flex gap-2 " + style}>
            <Button variant="bordered" size="lg" fullWidth className="rounded-md" onClick={noClick}>
                Tidak
            </Button>
            <Button color="danger" className="rounded-md" size="lg" fullWidth isLoading={isLoading} onClick={yesClick}>
                Ya
            </Button>
        </div>
    )
}

export default YesNoButton