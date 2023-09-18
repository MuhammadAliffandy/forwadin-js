'use client'
import { useRef } from "react"
const ModalTemplate = ({ children, openModal, setopenModal, outsideClose = true }) => {
    const modalContentRef = useRef()
    const modalBackgroudRef = useRef()
    const handleCloseModal = (e: React.MouseEvent) => {
        if (outsideClose)
            if (!modalContentRef.current.contains(e.target)) {
                setopenModal(false)
            }
    }
    return (
        <>
            <div className={'fixed z-20 h-full w-full inset-0 top-0 left-0 ' + (openModal ? 'block' : 'hidden')}>
                <div className='w-full h-full bg-black/20 top-0 absolute' ref={modalBackgroudRef} onClick={handleCloseModal}></div>
                <div ref={modalContentRef} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md w-full max-w-md'>
                    <div className='absolute top-0 right-0 px-2 text-[#B0B4C5] hover:cursor-pointer text-2xl' onClick={() => setopenModal(false)}>&times;</div>
                    {children}
                </div>
            </div>
        </>

    )
}

export default ModalTemplate