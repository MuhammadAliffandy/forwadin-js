import { Dispatch, SetStateAction } from "react";
const imageExt = [
    'jpg',
    'jpeg',
    'png',
    'svg',
    'raw'
]
export const getFileFromUrl = async (url, setfiles) => {
    console.log(url)
    const image = await fetch(process.env.BASE_URL_DEV + '/' + url)
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

export const getExtensionFromUrl = (url) => {
    const path = url.split('/')
    const filename = path[path.length - 1]
    const parts = filename.split('.')

    if (parts.length > 1) {
        return parts[parts.length - 1].toLowerCase()
    } else {
        return ''
    }
}

export const isFileImage = (url) => {
    const extension = getExtensionFromUrl(url)
    // console.log(extension)
    return imageExt.includes(extension)
}