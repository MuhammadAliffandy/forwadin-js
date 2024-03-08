import { useState } from "react"
import { animated, useSpring, useTransition } from '@react-spring/web'
import { Tabs, Tab } from "@nextui-org/react";

const OneStep = () => {
    const [buttonActive, setButtonActive] = useState('button1')
    const [isDropdown, setIsDropdown] = useState(false)
    const [buttonContent, setButtonContent] = useState<ObjectContent>({
        button1: "Bisnis dan Pemasaran",
        button2: "Komersial dan Penjualan",
        button3: "Organisasi Sosial",
    })
    const springStyle = useTransition(buttonActive, {
        from: { opacity: "0" },
        enter: { opacity: "1" }
    })
    const dropdownTransition = useTransition(isDropdown, {
        from: { opacity: "0", transform: "scale(0.5)" },
        enter: { opacity: "1", transform: "scale(1)" },
        leave: { opacity: "0", transform: "scale(0.5)" },
    })
    const textContent = {
        'button1': {
            label: "Bisnis dan Pemasaran",
            text: "Bidang ini dapat memanfaatkan fitur broadcast untuk mengirim promosi, pengumuman, dan informasi produk kepada pelanggan dalam jumlah besar secara efisien. Sementara itu, fitur Campaign dapat membantu merencanakan dan menyampaikan pesan iklan dengan waktu yang tepat kepada target audiens yang sesuai.",
        },
        'button2': {
            label: "Komersial dan Penjualan",
            text: "Dengan fitur broadcast, pelaku bisnis dapat memberi tahu pelanggan tentang penawaran khusus, diskon, atau acara penjualan dengan cepat. Fitur campaign dapat membantu mengatur kampanye penjualan yang lebih terarah dan efektif.",
        },
        'button3': {
            label: "Organisasi Sosial",
            text: "Organisasi non-profit dapat menggunakan fitur broadcast untuk menginformasikan para donatur tentang proyek, acara komunitas, atau inisiatif sosial yang sedang berlangsung. Fitur campaign bisa membantu dalam mengingatkan tentang acara atau program yang akan datang.",
        }
    }
    const handleClick = (e) => {
        switch (e.currentTarget.innerHTML) {
            case 'Bisnis dan Pemasaran':
                setButtonActive('button1')
                setButtonContent({
                    button1: "Bisnis dan Pemasaran",
                    button2: "Komersial dan Penjualan",
                    button3: "Organisasi Sosial",
                })
                break;
            case 'Komersial dan Penjualan':
                setButtonActive('button2')
                setButtonContent({
                    button1: "Komersial dan Penjualan",
                    button2: "Bisnis dan Pemasaran",
                    button3: "Organisasi Sosial",
                })
                break;
            case 'Organisasi Sosial':
                setButtonActive('button3')
                setButtonContent({
                    button1: "Organisasi Sosial",
                    button2: "Bisnis dan Pemasaran",
                    button3: "Komersial dan Penjualan",
                })
                break;
            default:
                break;
        }
        setIsDropdown(false)
    }
    return (
        <>
            <div className='w-full lg:w-[80%] mx-auto'>
                <p className='text-center text-primary text-4xl font-bold'>"One Step Closer to More Effective and Connected Communication!"</p>
            </div>
            <div className='flex flex-col lg:flex-row lg:mt-20 gap-12 lg:gap-0'>
                <div className='flex-none lg:basis-2/5 flex justify-center'>
                    <img
                        src='/assets/images/landing_image6.png'
                        width={221}
                        height={136}
                        alt='dummy'
                        className='object-contain   '
                    />
                </div>
                <div className='lg:basis-3/5'>
                    <Tabs color="primary" variant="light" fullWidth selectedKey={buttonActive} onSelectionChange={setButtonActive} className="hidden lg:block">
                        <Tab key={'button1'} title="Bisnis dan Pemasaran" />
                        <Tab key={'button2'} title="Komersial dan Penjualan" />
                        <Tab key={'button3'} title="Organisasi Sosial" />
                    </Tabs>

                    <div className='lg:hidden block'>
                        <div className='border border-primary rounded-full px-6 py-2 text-center whitespace-nowrap bg-primary text-white flex gap-2 justify-center'
                            onClick={() => setIsDropdown(!isDropdown)}>
                            <p>{buttonContent.button1} </p>
                            <div className='flex items-center' >
                                <img
                                    src={'/assets/icons/caret-down.svg'}
                                    width={14}
                                    height={9}
                                    alt='caret down'
                                />

                            </div>
                        </div>
                        <div className='relative'>
                            {dropdownTransition((style, item) => item && (
                                <animated.div style={style} className={`absolute bg-white-50 p-2 w-full text-primary`}>
                                    <div className='rounded-md px-6 py-2 text-center whitespace-nowrap hover:bg-neutral-75 hover:cursor-pointer' id='dropdown_button1'
                                        onClick={handleClick}>
                                        {buttonContent.button2}
                                    </div>
                                    <div className='rounded-full px-6 py-2 text-center whitespace-nowrap hover:bg-neutral-75 hover:cursor-pointer' id='dropdown_button2'
                                        onClick={handleClick}>
                                        {buttonContent.button3}
                                    </div>
                                </animated.div>
                            ))}
                        </div>

                    </div>
                    <div className='mt-8'>
                        {springStyle((style, item) => <animated.div style={style}>{textContent[`${buttonActive}`].text}</animated.div>)}

                    </div>
                </div>
            </div>
        </>
    )
}

export default OneStep