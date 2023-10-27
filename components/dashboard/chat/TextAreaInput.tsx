import { Dispatch, SetStateAction, useEffect, useState } from "react"

const TextAreaInput = ({ text, settext }: {
    text: string,
    settext: Dispatch<SetStateAction<string>>
}) => {
    const [counter, setcounter] = useState(0)
    useEffect(() => {
        setcounter(text.length)
    }, [text])
    return (
        <div className="relative">
            <textarea className="rounded-md w-full overflow-y-auto" placeholder="Tuliskan pesan anda" cols={4} rows={4} value={text} onChange={e => settext(e.target.value)} maxLength={1500}></textarea>
            <div className="absolute bottom-3 right-3 text-customGray text-sm">
                <p>{counter}/1500</p>
            </div>
        </div>
    )
}

export default TextAreaInput