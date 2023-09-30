import { Dispatch, SetStateAction, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import MultipleInputLabel from '../MultipleInputLabel'
import ModalTemplate from '../../template/ModalTemplate'

const AddDeviceModal = (
    { openModal, setopenModal }:
        { openModal: boolean, setopenModal: Dispatch<SetStateAction<boolean>> }
) => {
    const [isLoading, setisLoading] = useState(false)
    const [deviceName, setdeviceName] = useState('')
    const [inputError, setinputError] = useState({ error: false, message: '' })
    const [labelList, setlabelList] = useState([
        { name: 'asd', active: true },
        { name: 'asd2', active: true },
        { name: 'asd3', active: true },
        { name: 'asd4', active: false }
    ])
    const handleSubmit = async () => {
        if (!deviceName) {
            setinputError({ error: true, message: 'tidak boleh kosong' })
        } else {

            setisLoading(true)
            setTimeout(() => {
                setisLoading(false)
                toast.success('Device Added Successfully')
                setopenModal(false)
                // Refresh device data
            }, 3000)
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
                        <MultipleInputLabel labelList={labelList} setlabelList={setlabelList} />
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