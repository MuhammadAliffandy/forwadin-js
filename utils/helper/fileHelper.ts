import { Dispatch, SetStateAction } from "react";

export const getFileFromUrl = async (url: string, setfiles: Dispatch<SetStateAction<File[]>>) => {
    console.log(url)
    const image = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/' + url)
    console.log(image.status)
    if (image.ok) {
        const fileName = url.substring(
            url.lastIndexOf("/") + 1
        );
        const imageData = await image.blob()
        console.log(imageData)
        const file = new File(
            [imageData],
            fileName,
            { type: 'image/png' }
        )
        console.log(file)
        setfiles(prev => [...prev, file])
    }
}