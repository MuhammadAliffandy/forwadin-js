'use client'
import { animated, useTransition } from "@react-spring/web"
import { Dispatch, SetStateAction, useRef } from "react"
interface ModalTemplateProps {
    children: React.ReactNode,
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    outsideClose: boolean
}
const ModalTemplate = ({ children, openModal, setopenModal, outsideClose = true }: ModalTemplateProps) => {
    const modalContentRef = useRef<HTMLDivElement>(null)
    const modalBackgroudRef = useRef<HTMLDivElement>(null)
    const handleCloseModal = (e: React.MouseEvent) => {
        if (outsideClose && modalContentRef.current)
            if (!modalContentRef.current.contains(e.target as Node)) {
                setopenModal(false)
            }
    }
    const componentTransition = useTransition(openModal, {
        from: {
            // transform: "translateX(100px)",
            opacity: "0",
        },
        enter: {
            // transform: "translateX(0px)",
            opacity: "1",
        },
        leave: {
            opacity: "0"
        }

    })
    return (
        <>
            {componentTransition((style, item) => item && (
                <animated.div style={style} className={'fixed z-20 h-full w-full inset-0 top-0 left-0'}>
                    <div className='w-full h-full bg-black/20 top-0 absolute' ref={modalBackgroudRef} onClick={handleCloseModal}></div>
                    <div ref={modalContentRef} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md w-full max-w-md '>
                        <div className='absolute top-0 right-0 px-2 text-[#B0B4C5] hover:cursor-pointer text-2xl' onClick={() => setopenModal(false)}>&times;</div>
                        {children}
                    </div>
                </animated.div>))}
        </>

    )
}

export default ModalTemplate