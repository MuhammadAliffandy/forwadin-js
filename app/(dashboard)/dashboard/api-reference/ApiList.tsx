'use client'
import React from 'react'
import { ApiDataTypes } from './ApiData'
import ApiMethod from './ApiMethod'
import { Accordion, AccordionItem, Card, CardBody, Divider, Snippet } from '@nextui-org/react'
import { CodeBlock, CopyBlock } from 'react-code-blocks'
import ReactJson from '@microlink/react-json-view'

const ApiList = ({ listApi }: { listApi: ApiDataTypes[] }) => {
    return (
        <>
            {listApi.map((api, index) => (
                <ApiDetail apiDetail={api} key={'api_' + index} />
            ))}
        </>
    )
}

export default ApiList

const ApiDetail = ({ apiDetail }: { apiDetail: ApiDataTypes }) => {
    return (
        <div className={apiDetail.url}>
            <Accordion variant='shadow' isCompact className={'rounded-md'} fullWidth>
                <AccordionItem title={<div className='flex gap-4 items-center'>
                    <ApiMethod type={apiDetail.method} />
                    <p className='text-xs'>
                        {apiDetail.url}
                    </p>
                </div>}>
                    <Snippet classNames={{
                        pre: 'flex gap-2 items-center'
                    }} fullWidth symbol={
                        <img src='/assets/icons/link.svg' width={24} />
                    }>{process.env.NEXT_PUBLIC_BACKEND_URL + apiDetail.url}</Snippet>
                </AccordionItem>
            </Accordion>
            <Card className='rounded-md mt-4'>
                <CardBody>
                    <p className='font-lexend text-2xl font-bold'>Request Samples</p>
                    {apiDetail.headers.length > 0 && (
                        <>

                            <p className='font-lexend text-lg font-bold mt-6'>Request Headers</p>
                            <Divider className='' />
                            <div className='flex flex-col gap-4 mt-2'>
                                {apiDetail.headers.map(header => (
                                    <>
                                        <div className='flex items-end justify-between'>
                                            <div>
                                                <p className='text-[10px]'>{header.name}</p>
                                                <p className='text-sm mt-[-6px]'>{header.value}</p>
                                            </div>
                                            <div className='text-customGray'>
                                                {header.description}
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </>
                    )}

                    {apiDetail.pathVariables && (
                        <>

                            <p className='font-lexend text-lg font-bold mt-6'>Path Variables</p>
                            <Divider className='' />
                            <div className='flex flex-col gap-4 mt-2'>
                                {apiDetail.pathVariables.map(path => (
                                    <>
                                        <div className='flex items-end justify-between'>
                                            <div>
                                                <p className=''>{path.name}</p>
                                            </div>
                                            <div className='text-customGray'>
                                                {path.description}
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </>
                    )}
                    {(apiDetail.type === 'json' && apiDetail.jsonSampleRequests) && (
                        <>
                            <p className='font-lexend text-lg font-bold mt-6'>Request Body</p>
                            <Divider className='' />
                            <div className='flex flex-col gap-4 mt-4'>
                                {apiDetail.jsonSampleRequests.map((jsonString, idx) => (
                                    <div key={idx} className='rounded-md border border-customGray p-2 overflow-hidden max-w-full'>
                                        <ReactJson
                                            key={idx}
                                            enableClipboard
                                            collapsed={false}
                                            displayDataTypes={false}
                                            displayObjectSize={false}
                                            name={false}
                                            collapseStringsAfterLength={60}
                                            src={jsonString} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {(apiDetail.type === 'formdata' && apiDetail.formDataSampleRequests) && (
                        <>
                            <p className='font-lexend text-lg font-bold mt-6'>Request Body</p>
                            <Divider className='' />
                            <table className='w-full border-spacing-y-2 border-spacing-x-2 -mx-2 border-separate mt-4'>
                                <tbody>

                                    {apiDetail.formDataSampleRequests.map((apiFormdata, idx) => (
                                        <>
                                            <tr key={idx}>
                                                <th className='font-semibold whitespace-pre '>{apiFormdata.key}</th>
                                                <td className="break-all">{apiFormdata.value}</td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </>)}
                    <p className='font-lexend text-2xl font-bold mt-6'>Response Samples</p>
                    <Divider className='' />

                    <div className='flex flex-col gap-4 mt-4'>
                        {apiDetail.sampleResponses.map(obj => (
                            <div>
                                <p className='text-[10px]'>Status Code: {obj.status}</p>
                                <div className='rounded-md border border-customGray p-2 overflow-hidden'>
                                    <ReactJson
                                        enableClipboard
                                        collapsed={false}
                                        displayDataTypes={false}
                                        displayObjectSize={false}
                                        name={false}

                                        collapseStringsAfterLength={60}
                                        src={obj.response} />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

