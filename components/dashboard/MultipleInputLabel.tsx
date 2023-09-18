import Image from "next/image"
import { useEffect, useState } from "react"

const MultipleInputLabel = ({ labelList, setlabelList }) => {
    const [isLabelOpen, setisLabelOpen] = useState(false)
    const [inputText, setinputText] = useState('')
    const handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (!labelList.find(label => label.name === inputText) && inputText) {
                setlabelList(old => [...old, { name: inputText, active: true }])
                setinputText('')
            } else {
                const currentLabel = labelList.map(label => label.name === inputText ? { name: label.name, active: true } : label)
                setlabelList(currentLabel)
                setinputText('')
            }
        }
    }
    const handleLabelClick = (label, status) => {
        const newLabelList = labelList.map((list => list.name === label ? { name: list.name, active: status } : list))
        setlabelList(newLabelList)
    }
    useEffect(() => {

    }, [])

    return (
        <>
            <div className='rounded-md text-sm w-full border border-customGray relative'>
                <div className='py-3 px-4 flex '>
                    <div className="basis-5/6 flex flex-wrap gap-2">
                        {labelList.map((label, idx) => label.active && (
                            <div key={idx} className='flex gap-2 rounded-full px-2 py-[2px] border border-black/50 hover:cursor-pointer' onClick={() => handleLabelClick(label.name, false)}>
                                <span className=''> {label.name}</span>
                                <span>&times;</span>
                            </div>
                        ))}
                    </div>
                    <div className="basis-1/6 flex justify-end hover:cursor-pointer" onClick={() => setisLabelOpen(!isLabelOpen)}>
                        <div className="items-cneter flex">
                            <Image src={'/assets/icons/caret-down-black.svg'} height={9} width={12} alt="" />
                        </div>
                    </div>
                </div>
                {isLabelOpen && (
                    <div className="absolute bg-white w-full mt-2">
                        <div className="py-4 px-4 shadow">
                            <p className="text-xs text-customGray">your label</p>
                            <div className="flex flex-wrap items-start gap-2 overflow-x-auto max-h-48 my-5">
                                {labelList.map((label, idx) => !label.active && (
                                    <div key={idx} onClick={() => handleLabelClick(label.name, true)} className={"hover:bg-neutral-75 rounded-full px-4 py-[2px] flex-none border border-customGray hover:cursor-pointer"}>{label.name}</div>
                                ))}
                            </div>
                            <div className="">
                                <input type="text" className="w-full rounded-md text-sm border border-customGray" placeholder="add label..." value={inputText} onChange={(e) => setinputText(e.target.value)} onKeyDown={handleEnter} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default MultipleInputLabel