'use client'
import { Carousel } from 'flowbite-react'
import Image from 'next/image'
const CustomCarousel = () => {
    const iter = [1, 2, 3, 4, 5]
    return (
        <Carousel
            className='bg-transparent w-[85%]'
            leftControl="&nbsp;"
            rightControl="&nbsp;">
            {iter.map(i => (
                <div key={i} className='h-full flex flex-col gap-4 justify-evenly px-8'>
                    <div className='flex justify-center'>
                        <Image
                            src='/assets/images/dummy.png'
                            width={441}
                            height={272}
                            alt='dummy'
                            className='flex-none'
                        />
                    </div>
                    <div className=''>
                        <p className='font-lexend text-3xl font-bold '>Jangkau Lebih Banyak dengan Mudah! Card ke {i}</p>
                        <p className='mt-4'>Dengan Fowardin, memperluas jangkauan komunikasi Anda tercapai dengan cepat. Kirim pesan Anda ke banyak kontak dan grup sekaligus melalui fitur Broadcast.</p>
                    </div>
                </div>
            ))}
        </Carousel>
    )
}

export default CustomCarousel