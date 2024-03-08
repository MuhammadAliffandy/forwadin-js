import { MessageTemplate } from '@/utils/types'
import React from 'react'


const TemplateContainer = ({ templateList, handleClick }) => {
    return (
        <>
            {templateList.length > 0 && (
                <div className="mt-4">
                    <p>Template</p>
                    <div className="flex gap-2 flex-wrap w-full mt-2">
                        {templateList.map(item => (
                            <div key={item.id} className='rounded-full px-2 py-[2px] border border-customGray/50 hover:border-customGray hover:cursor-pointer' onClick={() => handleClick(item.id)}>
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default TemplateContainer