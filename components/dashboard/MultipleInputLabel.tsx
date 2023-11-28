import { Label } from "@/utils/types"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { animated, useTransition } from "@react-spring/web";
import { useSession } from "next-auth/react";
import { fetchClient } from "@/utils/helper/fetchClient";

const MultipleInputLabel = (
    { labelList, setlabelList, placeholder, maxChar, type = null }:
        {
            labelList: Label[],
            setlabelList: Dispatch<SetStateAction<Label[]>>,
            placeholder?: string,
            maxChar?: number,
            type?: 'device' | 'contact' | null,
        }
) => {
    const { data: session } = useSession()
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
            if (!labelList.find(item => item.label.name === inputText) && inputText) {
                setlabelList(old => [...old, { label: { name: inputText, active: true } }])
                setinputText('')
            } else {
                const currentLabel: Label[] = labelList.map(item => item.label.name === inputText ? { label: { name: item.label.name, active: true } } : item)
                setlabelList(currentLabel)
                setinputText('')
            }
        }
    }
    const handleLabelClick = (labelName: string, status: boolean) => {
        const newLabelList: Label[] = labelList.map((item => item.label.name === labelName ? { label: { name: item.label.name, active: status } } : item))
        setlabelList(newLabelList)
    }
    const fetchLabel = async () => {
        let result

        if (type === 'device') {
            result = await fetchClient({
                url: '/devices/labels',
                method: 'GET',
                user: session?.user
            })
        } else {
            result = await fetchClient({
                url: '/contacts/labels',
                method: 'GET',
                user: session?.user
            })
        }
        if (result?.ok) {
            const resultData: string[] = await result.json()
            console.log('fetch label')
            console.log(resultData)
            setlabelList(resultData.map(item => {
                return {
                    label: {
                        name: item,
                        active: false
                    }
                }
            }))
        }
    }
    useEffect(() => {
        const newSearchLabel = labelList.filter(item => item.label.name.toLowerCase().includes(inputText.toLowerCase()))
        setsearchLabelList(newSearchLabel)
    }, [inputText])
    useEffect(() => {

    }, [inputText])
    useEffect(() => {
        if (session?.user?.token && type)
            fetchLabel()
    }, [session?.user?.token])

    return (
        <>
            <div className='rounded-md text-sm w-full border border-customGray relative'>
                <div className=' flex '>
                    <div className="basis-5/6 flex flex-wrap gap-2 py-3 pl-4">
                        {labelList.map((item, idx) => item.label.active && (
                            <div key={idx} className='flex gap-2 rounded-full px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => handleLabelClick(item.label.name, false)}>
                                <span className=''> {item.label.name}</span>
                                <span>&times;</span>
                            </div>
                        ))}
                    </div>
                    <div className="basis-1/6 flex justify-end hover:cursor-pointer px-4 py-3" onClick={() => setisLabelOpen(!isLabelOpen)}>
                        <div className="items-center flex">
                            <img src={'/assets/icons/caret-down-black.svg'} height={9} width={12} alt="" />
                        </div>
                    </div>
                </div>
                {componentTransition((style, item) => item && (
                    <animated.div style={style} className="absolute bg-white w-full mt-2 border-customGray border rounded-md z-10">
                        <div className="flex items-center gap-2 border-b border-customGray px-6 py-2">
                            <div className="hover:cursor-pointer" onClick={() => labelInputRef.current?.focus()} >
                                <img src="/assets/icons/search_grey.png" alt="" />
                            </div>
                            <input maxLength={(maxChar ? maxChar : 15)} ref={labelInputRef} type="text" placeholder={placeholder ? placeholder : "Cari / Tambah label"} className=" flex-1 w-full text-xs outline-none border-none focus:ring-0 focus:outline-none focus:border-transparent" value={inputText} onChange={(e) => setinputText(e.target.value)}
                                onKeyDown={handleEnter}
                            />
                        </div>
                        <div className="px-4">
                            <div className="flex flex-wrap items-start gap-2 overflow-x-auto max-h-48 my-5">
                                {inputText ? (
                                    <>
                                        {searchLabelList.map((item, idx) => !item.label.active && (
                                            <div key={idx} onClick={() => handleLabelClick(item.label.name, true)} className={"hover:bg-neutral-75 rounded-full px-4 py-[2px] flex-none border border-customGray hover:cursor-pointer"}>{item.label.name}</div>
                                        ))}
                                    </>) :
                                    (
                                        <>
                                            {labelList.map((item, idx) => !item.label.active && (
                                                <div key={idx} onClick={() => handleLabelClick(item.label.name, true)} className={"hover:bg-neutral-75 rounded-full px-4 py-[2px] flex-none border border-customGray hover:cursor-pointer"}>{item.label.name}</div>
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