import { Label } from "@/utils/types"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { animated, useTransition } from "@react-spring/web";

const MultipleInputLabel = (
    { labelList, setlabelList }:
        { labelList: Label[], setlabelList: Dispatch<SetStateAction<Label[]>>, }
) => {
    const labelInputRef = useRef<HTMLInputElement>(null)
    const [isLabelOpen, setisLabelOpen] = useState(false)
    const [searchLabelList, setsearchLabelList] = useState<Label[]>([])
    const componentTransition = useTransition(isLabelOpen, {
        from: {
            transform: "translateY(-50px)",
            opacity: "0",
        },
        enter: {
            transform: "translateY(0px)",
            opacity: "1",
        },
        leave: {
            transform: "translateY(50px)",
            opacity: "0",
        }

    })
    const [inputText, setinputText] = useState('')
    const handleEnter = (e: React.KeyboardEvent) => {

        if (e.key === 'Enter') {
            e.preventDefault()
            if (!labelList.find(label => label.name === inputText) && inputText) {
                setlabelList(old => [...old, { name: inputText, active: true }])
                setinputText('')
            } else {
                const currentLabel: Label[] = labelList.map(label => label.name === inputText ? { name: label.name, active: true } : label)
                setlabelList(currentLabel)
                setinputText('')
            }
        }
    }
    const handleLabelClick = (labelName: string, status: boolean) => {
        const newLabelList: Label[] = labelList.map((list => list.name === labelName ? { name: list.name, active: status } : list))
        setlabelList(newLabelList)
    }
    useEffect(() => {
        const newSearchLabel = labelList.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()))
        setsearchLabelList(newSearchLabel)
    }, [inputText])
    useEffect(() => {

    }, [inputText])

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
                            <img src={'/assets/icons/caret-down-black.svg'} height={9} width={12} alt="" />
                            {/* <Image src={'/assets/icons/caret-down-black.svg'} height={9} width={12} alt="" /> */}
                        </div>
                    </div>
                </div>
                {componentTransition((style, item) => item && (
                    <animated.div style={style} className="absolute bg-white w-full mt-2 border-customGray border rounded-md z-10">
                        <div className="flex items-center gap-2 border-b border-customGray px-6 py-2">
                            <div className="hover:cursor-pointer" onClick={() => labelInputRef.current?.focus()} >
                                <img src="/assets/icons/search_grey.png" alt="" />
                            </div>
                            <input maxLength={10} ref={labelInputRef} type="text" placeholder="Cari / Tambah label" className=" flex-1 w-full text-xs outline-none border-none focus:ring-0 focus:outline-none focus:border-transparent" value={inputText} onChange={(e) => setinputText(e.target.value)}
                                onKeyDown={handleEnter}
                            />
                        </div>
                        <div className="px-4">
                            <div className="flex flex-wrap items-start gap-2 overflow-x-auto max-h-48 my-5">
                                {inputText ? (
                                    <>
                                        {searchLabelList.map((label, idx) => !label.active && (
                                            <div key={idx} onClick={() => handleLabelClick(label.name, true)} className={"hover:bg-neutral-75 rounded-full px-4 py-[2px] flex-none border border-customGray hover:cursor-pointer"}>{label.name}</div>
                                        ))}
                                    </>) :
                                    (
                                        <>
                                            {labelList.map((label, idx) => !label.active && (
                                                <div key={idx} onClick={() => handleLabelClick(label.name, true)} className={"hover:bg-neutral-75 rounded-full px-4 py-[2px] flex-none border border-customGray hover:cursor-pointer"}>{label.name}</div>
                                            ))}
                                        </>)
                                }
                            </div>
                        </div>
                    </animated.div>
                ))}
            </div>
        </>
    )
}

export default MultipleInputLabel