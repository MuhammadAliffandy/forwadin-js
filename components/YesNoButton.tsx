interface YesNoButtonProps {
    yesClick: () => void,
    noClick: () => void,
    style?: string
}
const YesNoButton = ({ yesClick, noClick, style }: YesNoButtonProps) => {
    return (
        <div className={"flex gap-2 " + style}>
            <div className="w-full rounded-md border border-customGray py-3 text-center bg-white hover:cursor-pointer" onClick={noClick}>
                Tidak
            </div>
            <div className="w-full rounded-md border border-danger py-3 text-center bg-danger text-white hover:cursor-pointer" onClick={yesClick}>
                Ya
            </div>
        </div>
    )
}

export default YesNoButton