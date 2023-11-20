import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

const DisplayImage = ({ imageUrl }: {
    imageUrl: string
}) => {
    const [fileName, setfileName] = useState('')
    const finalUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '/' + imageUrl
    useEffect(() => {
        const parts = imageUrl.split('/')
        setfileName(parts[parts.length - 1])
    }, [])
    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button className="flex justify-between text-[#777C88] bg-neutral-75 rounded-md" fullWidth>
                        <div className='flex items-center gap-2'>
                            <div className='flex-none'>
                                <img src="/assets/icons/chat/image.svg" alt="" />
                            </div>
                            <div>
                                {fileName}
                            </div>
                        </div>
                        <div>view</div>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="DropdownImage">
                    <DropdownItem key="image" onClick={() => window.open(finalUrl, '_blank')}>
                        <img src={finalUrl} alt="" className="max-w-[200px]" />
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default DisplayImage