
import { TagsType } from '@/utils/types'
import { animated, useTransition } from '@react-spring/web'
import React, { useState, KeyboardEvent, Dispatch, SetStateAction, useEffect } from 'react'

const TagsInput = ({ listTags, selectedTags, setselectedTags }) => {
    const [tags, setTags] = useState([])
    const [searchedTags, setsearchedTags] = useState([])
    const [isFocused, setisFocused] = useState(false)
    const [inputText, setinputText] = useState('')
    const handleKeyDown = (e) => {

        if (e.key !== 'Enter' || !inputText.trim()) return
        const findTags = tags.find(tag => tag.title === inputText)
        if (findTags) {
            if (findTags.active) return
            else
                setTags(tags.map(tag => {
                    if (tag.title === findTags.title)
                        return {
                            title: findTags.title,
                            value: findTags.value,
                            active: true
                        }
                    else
                        return tag
                }))
            setinputText('')
        } else {
            setTags([...tags, { title: inputText, value: inputText, active: true }])
            setinputText('')
        }
    }

    const toggleTag = (currentTag, status) => {
        const newTags = tags.map(tag => {
            if (tag.title === currentTag.title)
                return {
                    ...currentTag,
                    active: status
                }
            else
                return tag
        })
        setTags(newTags)
    }
    const componentTransition = useTransition(isFocused, {
        from: {
            transform: "translateY(-50px)",
            opacity: "0",
        },
        enter: {
            transform: "translateY(0px)",
            opacity: "1",
        },
        leave: {
            transform: "translateY(50px)",
            opacity: "0",
        }
    })
    useEffect(() => {
        const newSearchTags = tags.filter(item => item.title.toLowerCase().includes(inputText.toLowerCase()) || item.value.toLowerCase().includes(inputText.toLowerCase()))
        setsearchedTags(newSearchTags)
    }, [inputText])
    useEffect(() => {
        // const modal = document.getElementById('tagsModal')
        // const inputTags = document.getElementById('tagsInput')
        // const handleClick = (e: any) => {
        //     console.log(modal?.contains(e.target as Node))
        //     if (!(modal?.contains(e.target as Node) || inputTags?.contains(e.target as Node)))
        //         setisFocused(false)
        // }
        // window.addEventListener('click', handleClick)
        // return () => {
        //     window.removeEventListener('click', handleClick)
        // }
    }, [])
    return (
        <div className='rounded-md text-sm w-full border border-customGray relative' id='tagsInput'>
            <div className='flex'>
                <div className="flex flex-wrap gap-2 py-3 px-6 w-full">
                    {tags.map((tag, index) => tag.active && (
                        <div className="flex gap-2 rounded-full px-2 py-[2px] border border-customGray" key={index}
                            onClick={() => toggleTag(tag, false)}>
                            <span className="">{tag.title}</span>
                            <span className="hover:cursor-pointer" >&times;</span>
                        </div>
                    ))}
                    <input
                        type="text"
                        value={inputText}
                        className="border-none outline-none p-0 bg-transparent focus:outline-none focus:ring-0 text-sm" placeholder=""
                        onFocus={() => setisFocused(true)}
                        onKeyDown={handleKeyDown}
                        // onBlur={() => setisFocused(false)}
                        onChange={e => setinputText(e.target.value)}
                    />

                </div>
                <div className="basis-1/6 flex justify-end hover:cursor-pointer px-4 py-3" onClick={() => setisFocused(!isFocused)}>
                    <div className="items-center flex">
                        <img src={'/assets/icons/caret-down-black.svg'} height={9} width={12} alt="" />
                    </div>
                </div>
            </div>
            {componentTransition((style, item) => item && (
                <animated.div style={style} className="absolute bg-white w-full mt-2 border-customGray border rounded-md z-10" id='tagsModal'>
                    <div className="px-4">
                        <div className="flex flex-wrap items-start gap-2 overflow-x-auto max-h-48 my-5">
                            {inputText ? (
                                <>
                                    {searchedTags.map((item, idx) => !item.active && (
                                        <div key={idx} onClick={() => toggleTag(item, true)} className={"hover:bg-neutral-75 rounded-full px-4 py-[2px] flex-none border border-customGray hover:cursor-pointer"}>{item.title}</div>
                                    ))}
                                </>) :
                                (
                                    <>
                                        {tags.map((item, idx) => !item.active && (
                                            <div key={idx} onClick={() => toggleTag(item, true)} className={"hover:bg-neutral-75 rounded-full px-4 py-[2px] flex-none border border-customGray hover:cursor-pointer"}>{item.title}</div>
                                        ))}
                                    </>)
                            }
                        </div>
                    </div>
                </animated.div>
            ))}
        </div>
    )
}

export default TagsInput