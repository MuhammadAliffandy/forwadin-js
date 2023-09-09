import { useState } from 'react'
const Accordion = ({ title, content }: { title: String, content: String }) => {
    const [isActive, setisActive] = useState(false)
    return (
        <div className='w-full bg-white p-2'>
            {/* Accordion-item */}
            <div className='flex justify-between cursor-pointer ' onClick={() => setisActive(!isActive)}>
                {/* Accordion title */}
                <div className='font-bold'>{title}</div>
                <div className='bg-primary w-[22px] h-[22px] flex-none font-bold text-white text-xl flex items-center justify-center'>
                    {isActive ? '-' : '+'}
                </div>
            </div>
            {isActive && (<div className='mt-2 text-sm'>
                {content}
            </div>)}
        </div>
    )
}

export default Accordion