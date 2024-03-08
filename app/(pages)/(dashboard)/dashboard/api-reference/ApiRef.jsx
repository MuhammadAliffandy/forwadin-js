'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { AllApiDataTypes, ApiDataTypes, allApiData } from './ApiData'
import dynamic from 'next/dynamic';
import ApiSideNav from './ApiSideNav';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import ApiMethod from './ApiMethod';
const ApiList = dynamic(() => import('./ApiList'), { ssr: false })
const ApiRef = () => {
    const [apiCount, setapiCount] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [searchedListApi, setsearchedListApi] = useState([])
    const handleScroll = (classname) => {
        const gotoElement = document.getElementsByClassName(classname)[0] 
        const container = document.getElementById('scrollContainer')
        if (gotoElement && container) {
            container.scrollTo({
                behavior: "smooth",
                top: gotoElement.offsetTop - container.offsetTop,
            })
        }

    }
    const filterApi = (text) => {
        const regex = new RegExp(text, 'i')
        let arrayResult = []
        allApiData.forEach(item => {
            const searchResult = item.apiList.filter(api => {
                if (regex.test(api.name) || regex.test(api.url) || regex.test(api.method))
                    return api
            })
            arrayResult.push(...searchResult)
        })
        return arrayResult
    }
    useEffect(() => {
        let num = 0
        allApiData.forEach(apiData => {
            num += apiData.apiList.length
        })
        setapiCount(num)
    }, [])
    useEffect(() => {
        setsearchedListApi(filterApi(searchText))
    }, [searchText])
    return (
        <>
            <div className="flex gap-2 lg:justify-between justify-center items-center mt-2 lg:mt-0 w-full">
                <div className="flex gap-2 items-center">
                    <p className='font-lexend text-2xl font-bold'>Forwardin API</p>
                    <div>
                        <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular h-4 w-4 flex items-center justify-center">
                            <p>{apiCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-4 w-full mt-8 '>
                <div id='scrollContainer' className='w-full flex flex-col gap-8 overflow-y-auto h-[90vh]'>
                    {allApiData.map((apiData, index) => (
                        <Fragment key={index}>
                            <ApiList listApi={apiData.apiList} />
                        </Fragment>
                    ))}
                </div>
                <div className='w-full max-w-xs h-[90vh] overflow-y-auto bg-white'>
                    <div className='flex gap-2 items-center px-4 py-3 sticky top-0 bg-white z-10 border-b border-customGray'>
                        <div className='flex-none'>
                            <img src="/assets/icons/search_grey.png" alt="" />
                        </div>
                        <input placeholder='cari disini' type="text" value={searchText} onChange={e => setSearchText(e.target.value)}
                            className=' focus:outline-none text-sm rounded-md focus:ring-0 w-full border-none'
                        />
                    </div>
                    {searchText ? (
                        <div className='flex flex-col gap-2'>
                            {searchedListApi.map((api, idx) => (
                                <Button fullWidth className='rounded-md flex gap-2 justify-start' variant='light' key={idx} onClick={() => handleScroll(api.url + '_' + api.method)}>
                                    <ApiMethod type={api.method} size='sm' />
                                    <p className='text-xs font-medium text-ellipsis overflow-hidden'> {api.name}</p>
                                </Button>
                            ))}
                        </div>
                    ) : (<>
                        <Accordion variant='light' selectionMode='multiple' itemClasses={{
                            title: 'text-sm font-inter'
                        }}>
                            {allApiData.map((apiData, index) => (
                                <AccordionItem key={index} aria-label={apiData.group} title={apiData.group}>
                                    <div className='flex flex-col gap-2'>
                                        {apiData.apiList.map((api, idx) => (
                                            <Button className='rounded-md flex gap-2 justify-start' variant='light' key={idx} onClick={() => handleScroll(api.url + '_' + api.method)}>
                                                <ApiMethod type={api.method} size='sm' />
                                                <p className='text-xs font-medium text-ellipsis overflow-hidden'> {api.name}</p>
                                            </Button>
                                        ))}
                                    </div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </>)}
                </div>
            </div>
        </>
    )
}

export default ApiRef