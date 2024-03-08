import { MediaMessageData } from '@/utils/types'
import Link from 'next/link'
import React from 'react'
const MediaChat = ({ media, isOutgoing = false }) => {
    const handleClick = () => {

    }
    return (
        <Link href={media.path} target='_blank'>
            <div className="border-neutral-75 border px-4 py-3 text-sm mt-2 rounded-l-2xl rounded-br-2xl bg-neutral-75 flex justify-between text-[#777C88]" onClick={handleClick}>
                <div className='flex items-center gap-2'>
                    <div className='flex-none'>
                        <img src="/assets/icons/chat/image.svg" alt="" />
                    </div>
                    <div>
                        {media.fileTitle}
                    </div>
                </div>
                <div>view</div>
            </div>
        </Link>
    )
}

export default MediaChat