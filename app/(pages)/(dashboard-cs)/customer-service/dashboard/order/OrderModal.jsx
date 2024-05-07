import MultipleInputLabel from '@/app/components/dashboard/MultipleInputLabel'
import TagsInput from '@/app/components/dashboard/TagsInput'
import TextAreaInput from '@/app/components/dashboard/chat/TextAreaInput'
import ModalTemplate from '@/app/components/template/ModalTemplate'
import { fetchClient } from '@/app/utils/helper/fetchClient'
import { Label, OrderData, OrderMessage, TagsType } from '@/app/utils/types'
import { Button } from '@nextui-org/react'
import { Session } from 'next-auth'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createOrderMessages, getOrderMessages, updateOrderMessages } from '@/app/api/repository/orderRepository'

const OrderModal = ({ data, openModal, session, setopenModal }) => {
    const [orderTemplate, setorderTemplate] = useState('')
    const [welcomeMessage, setwelcomeMessage] = useState('')
    const [followUpMessage, setfollowUpMessage] = useState('')
    const [completeMessage, setcompleteMessage] = useState('')
    const [keyList, setkeyList] = useState([])
    const [orderMessage, setorderMessage] = useState()
    const fetchOrderMessage = async () => {

        const result = await getOrderMessages(session.customerService.token)

        if (result.status === 200) {
            console.log('ini get order message')
            setorderMessage(result.data)
        }
    }
    const handleSubmit = async () => {

        const body = {
            orderTemplate: orderTemplate,
            welcomeMessage: welcomeMessage,
            processMessage: followUpMessage,
            completeMessage: completeMessage
        }
        if (orderMessage) {
            // Update
            const result = await updateOrderMessages(session.customerService.token,orderMessage.id,body)
            if (result.status === 201) {
                toast.success('Berhasil ubah template order')
                setopenModal(false)
            } else {
                toast.error('Gagal ubah order message')
            }
            return
        }

        const result = await createOrderMessages(session.customerService.token,body)
        if (result.status === 201) {
            toast.success('Berhasil buat template order')
            setopenModal(false)
        } else {
            toast.error('Gagal buat template order')
        }
    }
    useEffect(() => {
        if (session?.customerService?.token) {
            fetchOrderMessage()
        }
    }, [session?.customerService?.token])
    useEffect(() => {
        if (orderMessage) {
            setwelcomeMessage(orderMessage.welcomeMessage)
            setorderTemplate(orderMessage.orderTemplate)
            setfollowUpMessage(orderMessage.processMessage)
            setcompleteMessage(orderMessage.completeMessage)
        }
    }, [orderMessage])
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
            <div>
                <p className=' font-bold text-2xl'>Setting Pesan Order</p>
                <div className='flex flex-col gap-4 mt-8 text-sm'>
                    <div className=''>
                        <p className='mb-1'>Order Template (+ordertemplate)</p>
                        <TextAreaInput text={orderTemplate} settext={setorderTemplate} limit={255} />
                    </div>
                    <div>
                        <p className='mb-1'>Welcome Message (+welcome)</p>
                        <TextAreaInput text={welcomeMessage} settext={setwelcomeMessage} limit={255} />
                    </div>
                    <div>
                        <p className='mb-1'>Follow UP Message (+followup)</p>
                        <TextAreaInput text={followUpMessage} settext={setfollowUpMessage} limit={255} />
                    </div>
                    <div>
                        <p className='mb-1'>Complete Message (+complete)</p>
                        <TextAreaInput text={completeMessage} settext={setcompleteMessage} limit={255} />
                    </div>
                    <Button
                        fullWidth
                        color='primary'
                        className='rounded-md'
                        size='lg'
                        onClick={handleSubmit}
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