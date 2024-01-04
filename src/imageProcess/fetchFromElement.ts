export async function fetchImageBlobFromElement(element: HTMLCanvasElement): Promise<Blob> {
    return new Promise((res, err) => {
        element.toBlob((payload) => {
            if (payload == null) {
                err("Canve is empty")
            } else {
                res(payload)
            }
        })
    })
}

export async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)

        reader.onload = () => {
            const base64Str = reader.result as string;
            const finial = base64Str.substring(base64Str.indexOf(", ") + 1)
            resolve(finial)
        }
        reader.onerror = (err) => {
            reject(err)
        }
    })
}