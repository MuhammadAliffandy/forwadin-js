import { Dispatch, SetStateAction, useEffect, useState } from "react"

const TextAreaInput = ({ text, settext, limit = 1500 }: {
    text: string,
    settext: Dispatch<SetStateAction<string>>,
    limit?: number
}) => {
    const [counter, setcounter] = useState(0)
    useEffect(() => {
        if (text)
            setcounter(text.length)
    }, [text])
    return (
        <div className="relative">
            <textarea className="focus:outline-none focus:ring-0 rounded-md w-full overflow-y-auto text-sm border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary" placeholder="Tuliskan pesan anda" cols={4} rows={4} value={text} onChange={e => settext(e.target.value)} maxLength={limit}></textarea>
            <div className="absolute bottom-3 right-3 text-customGray text-sm">
                <p>{counter}/{limit}</p>
            </div>
        </div>
    )
}

export default TextAreaInput