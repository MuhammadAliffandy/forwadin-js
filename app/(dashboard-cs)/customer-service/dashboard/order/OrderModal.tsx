import MultipleInputLabel from '@/components/dashboard/MultipleInputLabel'
import TagsInput from '@/components/dashboard/TagsInput'
import TextAreaInput from '@/components/dashboard/chat/TextAreaInput'
import ModalTemplate from '@/components/template/ModalTemplate'
import { Label, OrderData, TagsType } from '@/utils/types'
import { Button } from '@nextui-org/react'
import { Session } from 'next-auth'
import React, { Dispatch, SetStateAction, useState } from 'react'
interface OrderModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    data: OrderData | undefined,
    session: Session | null
}
const OrderModal = ({ data, openModal, session, setopenModal }: OrderModalProps) => {
    const [orderTemplateText, setorderTemplateText] = useState('')
    const [keyList, setkeyList] = useState<string[]>([])

    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
            <div>
                <p className=' font-bold text-2xl'>Setting Pesan Order</p>
                <div className='flex flex-col gap-4 '>
                    <div className='bg-neutral-75 p-3 flex flex-col gap-4'>
                        <div>
                            <p className='mb-1'>Welcome Message (+welcome)</p>
                            <input type={'text'} placeholder={'Pesan Pembuka'} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary'} />
                        </div>
                        <div className='flex items-center gap-4'>
                            <p className=''>Keys</p>
                            {/* <KeysInput keyList={keyList} /> */}
                        </div>
                        <div className='bg-[#EDEFF5] p-3 text-xs text-customNeutral rounded-md'>
                            <p>Gunakan key yang sudah disediakan atau tambahkan key baru dengan cara mengetikan nama key baru.</p>
                        </div>
                    </div>
                    <div>
                        <p className='mb-1'>Welcome Message (+welcome)</p>
                        <TextAreaInput text={orderTemplateText} settext={setorderTemplateText} limit={255} />
                    </div>
                    <div>
                        <p className='mb-1'>Follow UP Message (+followup)</p>
                        <TextAreaInput text={orderTemplateText} settext={setorderTemplateText} limit={255} />
                    </div>
                    <div>
                        <p className='mb-1'>Complete Message (+complete)</p>
                        <TextAreaInput text={orderTemplateText} settext={setorderTemplateText} limit={255} />
                    </div>
                    <Button
                        fullWidth
                        color='primary'
                        className='rounded-md'
                        size='lg'
                    >Submit</Button>
                </div>
            </div>
        </ModalTemplate>
    )
}

export default OrderModal


// const KeysInput = ({keyList, setkeyList}: {keyList:string[], setkeyList:Dispatch<SetStateAction<string[]>>}) => {
//     const handleKeyDown = (e: any) => {

//         if (e.key !== 'Enter' || !inputText.trim()) return
//         const findTags = tags.find(tag => tag.title === inputText)
//         if (findTags) {
//             if (findTags.active) return
//             else
//                 setTags(tags.map(tag => {
//                     if (tag.title === findTags.title)
//                         return {
//                             title: findTags.title,
//                             value: findTags.value,
//                             active: true
//                         }
//                     else
//                         return tag
//                 }))
//             setinputText('')
//         } else {
//             setTags([...tags, { title: inputText, value: inputText, active: true }])
//             setinputText('')
//         }
//     }
//   return (
//     <div>OrderModal</div>
//   )
// }