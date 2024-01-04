import { createCanvas } from "@vladmandic/face-api"
import { fetchImageBlobFromElement } from "./fetchFromElement"

export interface Area {
    width: number,
    height: number,
    left: number,
    top: number,
}

export interface Size {
    width: number,
    height: number
}

export function crop(image: HTMLCanvasElement, box: Area): Promise<Blob> {
    const temp = createCanvas({ width: box.width, height: box.height })
    const ctx = temp.getContext("2d")
    if (ctx == null) {
        alert("Not suupport Canvas")
        throw Error("Not support Canvas")
    }
    // crop
    ctx.drawImage(image, box.left, box.top, box.width, box.height, 0, 0, box.width, box.height)
    return fetchImageBlobFromElement(temp)
}

export function resize(image: Blob, recommendSize: Size): Promise<Blob> {
    const temp = createCanvas({ width: recommendSize.width, height: recommendSize.height })
    const ctx = temp.getContext("2d")
    if (ctx == null) {
        alert("Not suupport Canvas")
        throw Error("Not support Canvas")
    }

    const img = new Image()
    img.src = URL.createObjectURL(image)
    // crop
    ctx.drawImage(img, 0, 0, recommendSize.width, recommendSize.height)
    return fetchImageBlobFromElement(temp)
}
