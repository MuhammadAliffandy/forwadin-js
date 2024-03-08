import Link from "next/link"
const SuccessForm = () => {
    return (
        <>
            <p className="text-center font-lexend text-2xl font-bold">Sign In Berhasil</p>
            <Link href={'/dashboard'} className='block  text-center p-4 mt-8 rounded-md w-full bg-primary text-white border border-primary' >
                Lanjut ke Dashboard
            </Link>
        </>
    )
}

export default SuccessForm