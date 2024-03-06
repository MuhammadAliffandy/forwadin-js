// import forwardInPic from '@/public/assets/icons/forwardin_black.png'
// import logoPic from '@/public/assets/icons/logo.png'
import CustomCarousel from '@/components/packages/CustomCarousel'
import Link from "next/link"
export default function Layout({
    children,
}) {

    return (
        <>
            <nav className="absolute top-0 z-10 w-full py-6">
                <div className="flex justify-between items-center px-8 relative xl:px-0 xl:w-[85%] mx-auto">
                    <Link href={'/'} className="flex gap-4 items-center">
                        <div>
                            <img
                                src={'/assets/icons/logo.png'}
                                alt="logo"
                            />
                        </div>
                        <div className="">
                            <img
                                src={'/assets/icons/forwardin_black.png'}
                                alt="forwardin"
                            />
                        </div>
                    </Link>
                </div>
            </nav>
            <main className='h-[100vh] flex justify-center items-center bg-neutral-75'>
                <div className='container w-full xl:w-[85%] mx-auto flex items-center h-[80%] gap-28 mt-24 lg:mt-0'>
                    <div className='lg:basis-1/2 h-full hidden lg:flex justify-end'>
                        <CustomCarousel />
                    </div>
                    <div className='lg:basis-1/2 w-full'>
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}
