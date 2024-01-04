
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