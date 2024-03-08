'use client'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { animated, useTransition } from "@react-spring/web"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"

const ModalTemplate = ({ children, openModal, setopenModal, outsideClose = true, hideCloseButton = false }) => {
    const modalContentRef = useRef(null)
    const modalBackgroudRef = useRef(null)
    const handleCloseModal = (e) => {
        if (outsideClose && modalContentRef.current)
            if (!modalContentRef.current.contains(e.target)) {
                setopenModal(false)
            }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            setopenModal(false)
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress );
        return () => {
            window.removeEventListener('keydown', handleKeyPress );
        };
    }, [])
    const componentTransition = useTransition(openModal, {
        from: {
            opacity: "0",
        },
        enter: {
            opacity: "1",
        },
        leave: {
            opacity: "0"
        }

    })
    return (
        <>
            <Modal isOpen={openModal}
                onOpenChange={setopenModal}
                isDismissable={outsideClose}
                scrollBehavior="inside"
                hideCloseButton={hideCloseButton}
            >
                <ModalContent>
                    <ModalBody className="rounded-md max-h-[90vh] overflow-y-auto">
                        <>
                            {children}
                            <div className="pb-[1px]" />
                        </>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* {componentTransition((style, item) => item && (
                <animated.div style={style} className={'fixed z-20 h-full w-full inset-0 top-0 left-0'}>
                    <div className='w-full h-full bg-black/20 top-0 fixed' ref={modalBackgroudRef} onClick={handleCloseModal}></div>
                    <div ref={modalContentRef} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md w-full max-w-md '>
                        <div className='absolute top-0 right-0 px-2 text-[#B0B4C5] hover:cursor-pointer text-2xl' onClick={() => setopenModal(false)}>&times;</div>
                        {children}
                    </div>
                </animated.div>))} */}

        </>

    )
}

export default ModalTemplate