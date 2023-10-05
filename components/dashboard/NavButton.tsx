import Link from "next/link"
const NavButton = ({ href, text, currentPage }: {
    href: string, text: string, currentPage: string
}) => {
    const isActive = (text === currentPage)
    return (
        <Link href={href} className={(isActive ? 'bg-primary text-white shadow-[0px_19.8px_47.14286px_0px_rgba(51,102,255,0.25)]' : 'hover:text-primary') + ' hover:cursor-pointer rounded-xl py-2 px-4 flex gap-2 items-center select-none'} >
            <img src={`/assets/icons/dashboard/${text}.svg`} alt="" className={(isActive ? '' : 'invert-[1] grayscale-0')} />
            <p>{text}</p>
        </Link>
    )
}

export default NavButton