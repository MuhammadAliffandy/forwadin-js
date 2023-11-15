import { fetchClient } from "@/utils/helper/fetchClient"
import { GroupData, Label } from "@/utils/types"
import { animated, useTransition } from "@react-spring/web"
import { useSession } from "next-auth/react"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import ContactLabel from "./label/ContactLabel"

interface InputProps {
    selectedKeys: string[],
    setselectedKeys: Dispatch<SetStateAction<string[]>>
}
const InputContactAndLabel = ({ selectedKeys, setselectedKeys }: InputProps) => {
    const { data: session } = useSession()
    const labelInputRef = useRef<HTMLInputElement>(null)
    const [isLabelOpen, setisLabelOpen] = useState(false)
    const [contactLabelList, setcontactLabelList] = useState<Label[]>([])
    const [groupList, setgroupList] = useState<Label[]>([])
    const [numberList, setnumberList] = useState<Label[]>([])
    const [inputText, setinputText] = useState('')
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
    const isNumber = (text: string) => {
        const nonNumericRegex = /[^0-9]/;

        return !nonNumericRegex.test(text)
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key !== 'Enter' || !inputText.trim() || !isNumber(inputText)) return
        console.log('masuk')
        const findLabel = numberList.find(item => item.label.name === inputText)
        if (findLabel) {
            setnumberList(numberList.map(item => {
                if (item.label.name === findLabel.label.name)
                    return {
                        label: {
                            name: item.label.name,
                            active: true
                        }
                    }
                return item
            }))
        }
        setnumberList([...numberList, { label: { name: inputText, active: true } }])
        setinputText('')

    }
    const handleContactLabelClick = (labelName: string, status: boolean) => {
        const newLabelList: Label[] = contactLabelList.map((item => item.label.name === labelName ? { label: { name: item.label.name, active: status } } : item))
        setcontactLabelList(newLabelList)
    }
    const handleGroupLabelList = (labelName: string, status: boolean) => {
        const newLabelList: Label[] = groupList.map((item => item.label.name === labelName ? { label: { name: item.label.name, active: status } } : item))
        setgroupList(newLabelList)
    }
    const handleNumberList = (labelName: string, status: boolean) => {
        const newLabelList: Label[] = numberList.map((item => item.label.name === labelName ? { label: { name: item.label.name, active: status } } : item))
        setnumberList(newLabelList)
    }
    const fetchContactLabelList = async () => {
        const result = await fetchClient({
            url: '/contacts/labels',
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData = await result.json()
            console.log(resultData)
            setcontactLabelList(resultData.map((item: string) => {
                return {
                    label: {
                        name: item,
                        active: false
                    }
                }
            }))
        }
    }
    const fetchGroupList = async () => {
        const result = await fetchClient({
            url: '/groups',
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData: GroupData[] = await result.json()
            setgroupList(resultData.map(item => {
                return {
                    label: {
                        name: item.name,
                        active: false
                    }
                }

            }))

        }
    }
    useEffect(() => {
        if (session?.user?.token && contactLabelList.length === 0) {
            fetchContactLabelList()
            fetchGroupList()
        }
    }, [session?.user?.token])
    useEffect(() => {
        //contact_labelContact, group_namaGroup
        const contactLabel = contactLabelList.filter(item => item.label.active).map(item => 'contact_' + item.label.name)
        const groupLabel = groupList.filter(item => item.label.active).map(item => 'group_' + item.label.name)
        const numberLabel = numberList.filter(item => item.label.active).map(item => item.label.name)
        setselectedKeys([...contactLabel, ...groupLabel, ...numberLabel])
    }, [numberList, groupList, contactLabelList])
    return (
        <>
            <div className='rounded-md text-sm w-full border border-customGray relative'>
                <div className=' flex '>
                    <div className="basis-5/6 flex flex-wrap gap-2 py-3 pl-4 ">
                        {contactLabelList.map((item, idx) => item.label.active && (
                            <ContactLabel idx={idx}
                                label={item}
                                onClick={() => handleContactLabelClick(item.label.name, false)}
                                key={idx}
                            />
                        ))}
                        {groupList.map((item, idx) => item.label.active && (
                            <ContactLabel idx={idx}
                                label={item}
                                onClick={() => handleGroupLabelList(item.label.name, false)}
                                radius="md"
                                color="black"
                                key={idx}
                            />
                        ))}
                        {numberList.map((item, idx) => item.label.active && (
                            <ContactLabel
                                idx={idx}
                                label={item}
                                onClick={() => handleNumberList(item.label.name, false)}
                                isBordered={true}
                                radius="full"
                                color="none"
                                key={idx}
                            />
                        ))}
                        <input type="text" className="border-none outline-none p-0 bg-transparent focus:outline-none focus:ring-0 text-sm"
                            value={inputText}
                            onFocus={() => setisLabelOpen(true)}
                            onChange={e => setinputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="basis-1/6 flex justify-end hover:cursor-pointer px-4 py-3" onClick={() => setisLabelOpen(!isLabelOpen)}>
                        <div className="items-center flex">
                            <img src={'/assets/icons/caret-down-black.svg'} height={9} width={12} alt="" />
                        </div>
                    </div>
                </div>
                {componentTransition((style, item) => item && (
                    <animated.div style={style} className="absolute bg-white w-full mt-2 border-customGray border rounded-md z-10 px-4">
                        <div className="">
                            <div className="text-xs pt-2 text-customNeutral">
                                contact label
                            </div>
                            <div className="flex flex-wrap items-start gap-2 overflow-x-auto max-h-48 my-5">
                                {contactLabelList.map((item, idx) => !item.label.active && (
                                    <ContactLabel idx={idx}
                                        label={item}
                                        onClick={() => handleContactLabelClick(item.label.name, true)}
                                        key={idx}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="">
                            <div className="text-xs pt-2 text-customNeutral">
                                Group
                            </div>
                            <div className="flex flex-wrap items-start gap-2 overflow-x-auto max-h-48 my-5">

                                {groupList.map((item, idx) => !item.label.active && (
                                    <ContactLabel idx={idx}
                                        label={item}
                                        onClick={() => handleGroupLabelList(item.label.name, true)}
                                        radius="md"
                                        color="black"
                                        key={idx}
                                    />
                                ))}
                            </div>
                        </div>

                    </animated.div>
                ))}
            </div>
        </>
    )
}

export default InputContactAndLabel