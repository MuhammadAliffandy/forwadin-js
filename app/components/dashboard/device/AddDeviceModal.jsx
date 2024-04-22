import { Dispatch, SetStateAction, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import MultipleInputLabel from '../MultipleInputLabel'
import ModalTemplate from '../../template/ModalTemplate'

import { useSession } from 'next-auth/react'
import { fetchClient } from '../../../utils/helper/fetchClient'
import { Label } from '@/app/utils/types'
import { createDevice } from '@/app/api/repository/deviceRepository'

const AddDeviceModal = (
    { openModal, setopenModal, fetchData }
) => {
    const { data: session } = useSession()
    const [isLoading, setisLoading] = useState(false)
    const [deviceName, setdeviceName] = useState('')
    const [inputError, setinputError] = useState({ error: false, message: '' })
    const [labelList, setlabelList] = useState([])
    const handleSubmit = async () => {
        if (!deviceName) {
            setinputError({ error: true, message: 'tidak boleh kosong' })
        } else {
            setisLoading(true)

            try {
                const response = await createDevice(session?.user?.token, JSON.stringify({
                    name: deviceName,
                    labels: (labelList ? labelList.filter(item => item.label.active).map(item => item.label.name) : null)
                }),)
                setisLoading(false)
                toast.success('Device berhasil ditambahkan')
                setopenModal(false)
                fetchData()
            } catch (error) {
                setisLoading(false)
                toast.error('Device gagal ditambahkan \n' + body.message)
                setinputError({ error: true, message: 'Gagal menambahkan device' })
            }

            // const result = await fetchClient({
            //     method: 'POST',
            //     body: JSON.stringify({
            //         name: deviceName,
            //         labels: (labelList ? labelList.filter(item => item.label.active).map(item => item.label.name) : null)
            //     }),
            //     url: '/devices/create',
            //     user: session?.user
            // })
            // setisLoading(false)
            // const body = await result?.json()
            // if (result && result.ok) {
            //     toast.success('Device berhasil ditambahkan')
            //     setopenModal(false)
            //     fetchData()
            // } else {
            //     toast.error('Device gagal ditambahkan \n' + body.message)
            //     setinputError({ error: true, message: 'Gagal menambahkan device' })
            // }
        }
    }
    return (
        <>
            <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
                <div className='font-bold text-2xl mt-8'>Tambah Device</div>
                <div className='mt-8 flex flex-col gap-4'>
                    <div>
                        <p>Nama Device</p>
                        <div className='relative mt-2'>
                            {inputError.error && (
                                <p className='px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2'>{inputError.message}</p>
                            )}
                            <input type="text" className={'py-3 px-4 focus:outline-none  rounded-md focus:ring-0 w-full ' + (inputError.error ? 'border-danger focus:border-danger' : 'border-customGray focus:border-primary ')} placeholder='Device Name' value={deviceName} onChange={e => setdeviceName(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <p className='mb-2'>Labels</p>
                        <MultipleInputLabel labelList={labelList} setlabelList={setlabelList} type='device' />
                    </div>
                    <div>
                        <button className='bg-primary rounded-md w-full p-4 text-center text-white hover:cursor-pointer mt-4' onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? (<PulseLoader size={10} color="#F3F5F8" />)
                                : (<p>
                                    Tambah
                                </p>)}
                        </button>
                    </div>
                </div>
            </ModalTemplate>
        </>
    )
}

export default AddDeviceModal