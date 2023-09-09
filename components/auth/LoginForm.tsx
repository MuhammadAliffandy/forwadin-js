import Link from "next/link"
const Login = () => {
    return (
        <div className='flex flex-col gap-8 '>
            <div className='text-center'>
                <p className='font-lexend font-bold text-3xl'>Welcome Back</p>
                <p className=''>We're so excited to see you again!</p>
            </div>
            <div className='flex flex-col gap-4'>
                <input type="text" placeholder='Username / Email' className='p-4 border border-[#B0B4C5] rounded-md w-full' style={{
                }} />
                <input type="text" placeholder='Password' className='p-4 border border-[#B0B4C5] rounded-md w-full' style={{
                }} />
            </div>
            <div>
                <Link href={'/'} className='text-primary'>
                    Lupa Password?</Link>
            </div>
            <div className='flex flex-col gap-4'>
                <div>
                    <button type="submit" className='p-4  rounded-md w-full bg-primary text-white'>Sign In</button>
                </div>
                <div className='flex justify-center items-center gap-6 md:px-6'>
                    <hr className='border border-[#B0B4C5] h-px basis-1/3' />
                    <p className='whitespace-nowrap'>Atau sign in dengan Google</p>
                    <hr className='border border-[#B0B4C5] h-px basis-1/3' />
                </div>
                <div>
                    <button type="submit" className='p-4  rounded-md w-full text-primary bg-white border border-primary'>Sign In</button>
                </div>
            </div>
            <div className='text-center text-lg'>
                <p>Butuh buat akun? <Link href={'/'} className='text-primary'>Daftar di sini</Link> </p>
            </div>
        </div>
    )
}

export default Login