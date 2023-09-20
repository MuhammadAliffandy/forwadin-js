
import CustomCarousel from '../packages/CustomCarousel'
const AuthPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <nav className="fixed top-0 z-10 w-full py-6">
                <div className="flex justify-between items-center px-8 relative xl:px-0 xl:w-[85%] mx-auto">
                    <div className="flex gap-4 items-center">
                        <div>
                            <img
                                src={'/assets/icons/logo.png'}
                                alt="logo"
                            />
                            {/* <Image
                                src={logoPic}
                                alt="logo"
                            /> */}
                        </div>
                        <div className="">
                            <img
                                src={'/assets/icons/forwardin_black.png'}
                                alt="forwardin"
                            />
                            {/* <Image
                                src={forwardInPic}
                                alt="forwardin"
                            /> */}
                        </div>
                    </div>
                </div>
            </nav>
            <main className='h-[100vh] flex justify-center items-center bg-neutral-75'>
                <div className='container w-full xl:w-[85%] mx-auto flex items-center h-[80%] gap-28'>
                    <div className='lg:basis-1/2 h-full hidden lg:flex justify-end'>
                        <CustomCarousel />
                    </div>
                    <div className='lg:basis-1/2 w-full'>
                        <div className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-lg'>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </>

    )
}

export default AuthPage