import { fetchClient } from "@/app/utils/helper/fetchClient"
import { GroupData, Label } from "@/app/utils/types"
import { animated, useTransition } from "@react-spring/web"
import { useSession } from "next-auth/react"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import ContactLabel from "./label/ContactLabel"
import { CustomerService, User } from "next-auth"
import { getAllContactsLabels } from '@/app/api/repository/contactRepository'
import { getAllGroups } from '@/app/api/repository/groupRepository'

const InputContactAndLabel = ({ selectedKeys, setselectedKeys, isAutoReply = false, isDisabled = false, showDescription = true, user }) => {
    const [isLoaded, setisLoaded] = useState(false)
    const [isLabelOpen, setisLabelOpen] = useState(false)
    const [contactLabelList, setcontactLabelList] = useState([])
    const [groupList, setgroupList] = useState([])
    const [numberList, setnumberList] = useState([])
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
    const isNumber = (text) => {
        const nonNumericRegex = /[^0-9]/;
        return !nonNumericRegex.test(text)
    }
    const handleKeyDown = (e) => {
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
    const handleContactLabelClick = (labelName, status) => {
        const newLabelList = contactLabelList.map((item => item.label.name === labelName ? { label: { name: item.label.name, active: status } } : item))
        setcontactLabelList(newLabelList)
    }
    const handleGroupLabelList = (labelName, status) => {
        const newLabelList = groupList.map((item => item.label.name === labelName ? { label: { name: item.label.name, active: status } } : item))
        setgroupList(newLabelList)
    }
    const handleNumberList = (labelName, status) => {
        const newLabelList = numberList.map((item => item.label.name === labelName ? { label: { name: item.label.name, active: status } } : item))
        setnumberList(newLabelList)
    }
    const fetchContactLabelList = async () => {

        const result = await getAllContactsLabels(user.token)

        if (result.status === 200) {
            const resultData  = result.data

            const newArr = resultData.filter(item => !contactLabelList.some(ele => ele.label.name === item)).map(item => {
                return {
                    label: {
                        name: item,
                        active: false
                    }
                }

            })
            setcontactLabelList(prev => [...prev, ...newArr])
        }
    }
    const fetchGroupList = async () => {

        const result = await getAllGroups(user.token)

        if (result.status === 200) {
            const resultData = result.data
            const newArr = resultData.filter(item => !groupList.some(ele => ele.label.name === item.name)).map(item => {
                return {
                    label: {
                        name: item.name,
                        active: false
                    }
                }

            })
            setgroupList(prev => [...prev, ...newArr])
        }
    }
    const assignNumbers = () => {
        const numberArray = selectedKeys.filter(item => !(item.startsWith('group_') || item.startsWith('label_') || item.includes('*') || item.includes('all')))
        console.log(numberArray)
        const newArray = numberArray.map(item => {
            return {
                label: {
                    name: item,
                    active: true
                }
            }
        })

        setnumberList(prev => [...prev, ...newArray])
    }
    const assignGroup = () => {
        const groupArray = selectedKeys.filter(item => item.startsWith('group_')).map(item => item.replace('group_', ''))

        setgroupList(groupArray.map(item => {
            return {
                label: {
                    name: item,
                    active: true
                }
            }
        }))
    }
    const assignContact = () => {
        const labelList = selectedKeys.filter(item => item.startsWith('label_')).map(item => item.replace('label_', ''))

        setcontactLabelList(labelList.map(item => {
            return {
                label: {
                    name: item,
                    active: true
                }
            }
        }))

    }
    useEffect(() => {
        if (isAutoReply) {
            setnumberList(prev => [...prev,
            { label: { name: '*', active: selectedKeys.includes('*') } },
            { label: { name: 'all', active: selectedKeys.includes('all') } }])
        }
        else
            setnumberList(prev => [...prev,
            { label: { name: 'all', active: selectedKeys.includes('all') } }])
        assignGroup()
        assignNumbers()
        assignContact()
        setisLoaded(true)
    }, [])
    useEffect(() => {

        if (user?.token && isLoaded) {
            fetchContactLabelList()
            fetchGroupList()
        }
    }, [user?.token, isLoaded])

    useEffect(() => {
        //label_contactlabel, group_namaGroup
        if (isLoaded) {
            const contactLabel = contactLabelList.filter(item => item.label.active).map(item => 'label_' + item.label.name)
            const groupLabel = groupList.filter(item => item.label.active).map(item => 'group_' + item.label.name)
            const numberLabel = numberList.filter(item => item.label.active).map(item => item.label.name)
            setselectedKeys([...contactLabel, ...groupLabel, ...numberLabel])
        }

    }, [numberList, groupList, contactLabelList])
    return (
        <>
            {showDescription && (
                <div className="bg-neutral-75 rounded-md text-xs text-customNeutral px-4 py-3 mb-2">
                    <ul className="list-outside list-disc pl-2">
                        <li>
                            Jika ingin memasukkan nomor wa, sertakan dengan kode negara. Contoh: 62812345678
                        </li>
                        <li>
                            Kontak hanya akan menerima satu salinan pesan, meskipun mereka ada dalam beberapa label atau grup yang Anda pilih.
                        </li>
                        <li>
                            Jika kontak tersimpan di device yang berbeda, maka pesan tidak bisa terkirim
                        </li>
                    </ul>

                </div>
            )}
            {isDisabled ? (
                <div className='rounded-md text-sm w-full border border-customGray/50 hover:border-customGray relative hover:cursor-not-allowed bg-[#F0F0F5]'>
                    <p className="absolute right-4 top-1/2 -translate-y-2   text-customGray">tidak dapat diganti</p>
                    <div className="w-full flex flex-wrap gap-2 py-3 pl-4 z-10">
                        {contactLabelList.map((item, idx) => item.label.active && (
                            <ContactLabel idx={idx}
                                label={item}
                                isDisabled={true}
                                key={idx}
                            />
                        ))}
                        {groupList.map((item, idx) => item.label.active && (
                            <ContactLabel idx={idx}
                                label={item}
                                isDisabled={true}
                                radius="md"
                                color="black"
                                key={idx}
                            />
                        ))}
                        {numberList.map((item, idx) => item.label.active && (
                            <ContactLabel
                                idx={idx}
                                label={item}
                                isDisabled={true}
                                isBordered={true}
                                radius="full"
                                color="none"
                                key={idx}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className='rounded-md text-sm w-full border border-customGray/50 hover:border-customGray relative'>
                    <div className='flex'>
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
                            <div className="">
                                <div className="text-xs pt-2 text-customNeutral">
                                    Your Label
                                </div>
                                <div className="flex flex-wrap items-start gap-2 overflow-x-auto max-h-48 my-5">

                                    {numberList.map((item, idx) => !item.label.active && (
                                        <ContactLabel idx={idx}
                                            label={item}
                                            onClick={() => handleNumberList(item.label.name, true)}
                                            radius="full"
                                            color="none"
                                            isBordered
                                            key={idx}
                                        />
                                    ))}
                                </div>
                            </div>

                        </animated.div>
                    ))}
                </div>
            )}
        </>
    )
}

export default InputContactAndLabel