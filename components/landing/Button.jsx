'use client'
import Link from "next/link"

const Button = ({ text, href, isPrimary = true, styles }) => {
    return (
        <Link href={`${href}`} className={(isPrimary ? 'text-white-50 bg-primary' : 'text-primary bg-white') + ' border border-primary rounded-full px-6 py-2 hover:cursor-pointer text-center whitespace-nowrap ' + styles}>
            {text}
        </Link>
    )
}


export default Button