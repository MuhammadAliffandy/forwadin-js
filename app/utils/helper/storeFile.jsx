export const storeFile = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    const result = await fetch('/api/upload', {
        method: 'POST',
        body: formData,

    })
}
export const deleteFile = (fileName) => {

}
