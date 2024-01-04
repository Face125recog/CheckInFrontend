
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

export function crop(image: HTMLCanvasElement, temp: HTMLCanvasElement, box: Area) {
    const ctx = temp.getContext("2d")
    if (ctx == null) {
        alert("Not suupport Canvas")
        return
    }
    // crop
    ctx.drawImage(image, box.left, box.top, box.width, box.height, 0, 0, box.width, box.height)
}
