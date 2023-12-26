import { Tab, Tabs } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Pricing = () => {
    const router = useRouter()
    const [selected, setSelected] = useState(1)
    const [buttonActive, setButtonActive] = useState('monthly')
    const subscriptionContent = [
        {
            isStarter: true,
            title: 'Starter',
            body: 'Mulai perjalanan Anda dengan paket Starter selama 14 hari. Nikmati pesan otomatis, siaran pesan, dan  manajemen kontak yang efisien. Dapatkan integrasi yang membantu dan sinkronisasi kontak WhatsApp.',
            features: [
                { name: '10 Auto reply', available: true },
                { name: '50 Broadcast', available: true },
                { name: '5 Campaign', available: true },
                { name: '50 Contact', available: true },
                { name: '5 Device', available: true },
                { name: 'Excel / CSV Contact Import', available: true },
                { name: 'Google Contact Sync', available: false },
                { name: 'Whatsapp Contact Sync', available: false },

            ]
        },
        {
            isStarter: false,
            title: 'Basic',
            body: 'Dapatkan akses selama 1 bulan dengan paket Basic. Manfaatkan fitur pesan otomatis, siaran pesan, dan manajemen kontak yang ditingkatkan. Rasakan kenyamanan integrasi yang luas dengan sinkronisasi kontak Google dan WhatsApp.',
            price: {
                monthly: 'Rp. 65.000',
                yearly: 'Rp. 650.000',
            },
            features: [
                { name: '10 Auto reply', available: true },
                { name: '50 Broadcast', available: true },
                { name: '5 Campaign', available: true },
                { name: '50 Contact', available: true },
                { name: '5 Device', available: true },
                { name: 'Excel / CSV Contact Import', available: true },
                { name: 'Google Contact Sync', available: false },
                { name: 'Whatsapp Contact Sync', available: false },

            ],
            isFavorite: true
        },
        {
            isStarter: false,
            title: 'Premium',
            body: 'Perpanjang pengalaman Anda dengan paket Premium selama 1 bulan. Nikmati manfaat pesan otomatis, siaran pesan, dan manajemen kontak tanpa batasan. Aktifkan integrasi yang luas dengan sinkronisasi kontak Google dan WhatsApp.',
            price: {
                monthly: 'Rp. 76.000',
                yearly: 'Rp. 800.000',
            },
            features: [
                { name: '10 Auto reply', available: true },
                { name: '50 Broadcast', available: true },
                { name: '5 Campaign', available: true },
                { name: '50 Contact', available: true },
                { name: '5 Device', available: true },
                { name: 'Excel / CSV Contact Import', available: true },
                { name: 'Google Contact Sync', available: false },
                { name: 'Whatsapp Contact Sync', available: false },

            ],
        },
        {
            isStarter: false,
            title: 'Pro',
            body: 'Jelajahi seluruh fitur dengan paket Pro selama 1 bulan. Dapatkan keuntungan dari pesan otomatis, siaran pesan, serta manajemen kontak yang tidak terbatas. Aktifkan integrasi yang luas dengan sinkronisasi kontak Google dan WhatsApp.',
            price: {
                monthly: 'Rp. 86.000',
                yearly: 'Rp. 900.000',
            },
            features: [
                { name: '10 Auto reply', available: true },
                { name: '50 Broadcast', available: true },
                { name: '5 Campaign', available: true },
                { name: '50 Contact', available: true },
                { name: '5 Device', available: true },
                { name: 'Excel / CSV Contact Import', available: true },
                { name: 'Google Contact Sync', available: false },
                { name: 'Whatsapp Contact Sync', available: false },

            ],
        },
    ]
    return (
        <div className=' overflow-x-scroll h-[100vh]'>
            <div className='px-6 container mx-auto pt-12'>
                <p className='text-center text-xl'>Our Pricing</p>
                <p className='text-center text-4xl font-bold mt-2'>Subscription</p>
            </div>
            <div className="flex justify-center my-8 text-sm">
                <Tabs
                    variant='light'
                    radius='full'
                    color='primary'
                    selectedKey={buttonActive}
                    onSelectionChange={setButtonActive as any}
                >
                    <Tab key={'monthly'} title='monthly' />
                    <Tab key={'yearly'} title='yearly' />
                </Tabs>

            </div>
            {buttonActive === 'yearly' && (
                <div className='flex justify-center'>
                    <div className='bg-[#E6E8F0] rounded-md p-2 text-primary text-xs'>
                        Hemat hingga 25% dengan paket tahunan
                    </div>
                </div>
            )}

            <div className='flex overflow-x-scroll gap-4 lg:gap-12 flex-nowrap px-2 lg:justify-start text-xs mx-auto pb-12 lg:pl-32 '>
                {subscriptionContent.map((data, i) => (
                    <div className={"relative max-w-[280px] flex-none flex"} key={i}>
                        <div className={(selected === i ? 'bg-white shadow-xl ' : 'shadow-xl md:shadow-none') + ' px-8 pt-16 pb-4 rounded-xl flex flex-col justify-between'} onMouseEnter={() => setSelected(i)}>
                            <div>
                                {data.isFavorite && (
                                    <div className="absolute top-6 w-full flex">
                                        <div className="bg-[#FFB020] rounded-lg px-2 py-[2px] font-semibold">
                                            Most Popular
                                        </div>
                                    </div>
                                )}
                                <p className="text-2xl font-lexend">{data.title}</p>
                                <p className="mt-4">{data.body}</p>
                            </div>
                            <div>
                                <div className="flex items-baseline mt-2">
                                    {data.isStarter ? (
                                        <>
                                            <p className={"mt-8font-bold font-lexend text-2xl " + (buttonActive === 'yearly' ? 'mt-14' : 'mt-8')}>Gratis</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="mt-8font-bold font-lexend text-2xl">{data.price?.monthly}</p>
                                            <p className="ml-1">/bulan</p>
                                        </>
                                    )}
                                </div>
                                {!data.isStarter && (
                                    <>
                                        {buttonActive === 'yearly' && (
                                            <p className='text-customNeutral text-xs pt-2 font-semibold '>{data.price?.yearly}/tahun</p>
                                        )}
                                    </>
                                )}
                                <div id={'plan_' + i} className={(data.isFavorite ? 'bg-[#FFB020] border-[#FFB020]' : 'bg-primary border-primary') + ' border rounded-md px-6 py-2 text-center whitespace-nowrap text-white w-full block mt-2 hover:cursor-pointer'} onClick={() => {
                                    if (data.isStarter)
                                        router.push('/signup')
                                    else
                                        router.push('/subscription')
                                }}>
                                    {data.isStarter ? 'Start Now' : 'Get Started'}
                                </div>
                            </div>
                            <div className="mt-10 flex flex-col gap-4 px-8 w-full max-w-[280px] flex-none">
                                {data.features.map((feature, j) => (
                                    <div className="flex gap-2" key={i + '' + j}>

                                        {feature.available ? (
                                            <img src={'assets/icons/checklist.svg'}
                                                width={20}
                                                height={20}
                                                alt="checklist" />
                                        ) : (
                                            <img src={'assets/icons/no sign.svg'}
                                                width={20}
                                                height={20}
                                                alt="checklist" />)}

                                        <p>{feature.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Pricing
