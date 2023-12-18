const DisabledForm = ({ text, type }: { text: string | undefined, type: string }) => {
    return (
        <>
            {text && (
                <div className="relative hover:cursor-not-allowed">
                    <p className="absolute right-4 top-1/2 -translate-y-1/2   text-customGray">tidak dapat diganti</p>
                    <input type={type} value={text} placeholder=" " className={'px-4 py-3 text-sm rounded-md bg-[#F0F0F5] w-full border border-[#B0B4C5]/50 hover:border-[#B0B4C5] hover:cursor-not-allowed '} disabled />
                </div>
            )}
        </>
    )
}

export default DisabledForm