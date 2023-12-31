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
    const handleScroll = (classname: string) => {
        const gotoElement = document.getElementsByClassName(classname)[0] as HTMLDivElement
        const container = document.getElementById('scrollContainer')
        if (gotoElement && container) {
            container.scrollTo({
                behavior: "smooth",
                top: gotoElement.offsetTop - container.offsetTop,
            })
        }

    }
    useEffect(() => {
        let num = 0
        allApiData.forEach(apiData => {
            num += apiData.apiList.length
        })
        setapiCount(num)
    }, [])
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
                    <Accordion variant='light' selectionMode='multiple' itemClasses={{
                        title: 'text-sm font-inter'
                    }}>
                        {allApiData.map((apiData, index) => (
                            <AccordionItem key={index} aria-label={apiData.group} title={apiData.group}>
                                <div className='flex flex-col gap-2'>
                                    {apiData.apiList.map((api, idx) => (
                                        <Button className='rounded-md flex gap-2 justify-start' variant='light' key={idx} onClick={() => handleScroll(api.url)}>
                                            <ApiMethod type={api.method} size='sm' />
                                            <p className='text-xs font-medium text-ellipsis overflow-hidden'> {api.name}</p>
                                        </Button>
                                    ))}
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </>
    )
}

export default ApiRef