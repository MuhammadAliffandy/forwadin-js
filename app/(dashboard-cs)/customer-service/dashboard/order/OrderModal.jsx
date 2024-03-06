import MultipleInputLabel from '@/components/dashboard/MultipleInputLabel'
import TagsInput from '@/components/dashboard/TagsInput'
import TextAreaInput from '@/components/dashboard/chat/TextAreaInput'
import ModalTemplate from '@/components/template/ModalTemplate'
import { fetchClient } from '@/utils/helper/fetchClient'
import { Label, OrderData, OrderMessage, TagsType } from '@/utils/types'
import { Button } from '@nextui-org/react'
import { Session } from 'next-auth'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const OrderModal = ({ data, openModal, session, setopenModal }) => {
    const [orderTemplate, setorderTemplate] = useState('')
    const [welcomeMessage, setwelcomeMessage] = useState('')
    const [followUpMessage, setfollowUpMessage] = useState('')
    const [completeMessage, setcompleteMessage] = useState('')
    const [keyList, setkeyList] = useState([])
    const [orderMessage, setorderMessage] = useState()
    const fetchOrderMessage = async () => {
        const result = await fetchClient({
            url: '/orders/messages',
            method: 'GET',
            user: session?.customerService
        })
        if (result?.ok) {
            console.log('ini get order message')
            setorderMessage(await result.json())
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
            const result = await fetchClient({
                url: '/orders/messages/' + orderMessage.id,
                method: 'PUT',
                body: JSON.stringify(body),
                user: session?.customerService
            })
            if (result?.ok) {
                toast.success('Berhasil ubah template order')
                setopenModal(false)
            } else {
                toast.error('Gagal ubah order message')
            }
            return
        }
        const result = await fetchClient({
            url: '/orders/messages',
            method: 'POST',
            body: JSON.stringify(body),
            user: session?.customerService
        })
        if (result?.ok) {
            toast.success('Berhasil buat template order')
            setopenModal(false)
        } else {
            toast.error('Gagal buat template order')
            console.log(await result?.json())
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