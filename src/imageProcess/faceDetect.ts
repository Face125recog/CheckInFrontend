import {detectSingleFace, nets, TinyFaceDetector, TinyFaceDetectorOptions} from "@vladmandic/face-api"
import {Area} from "./cropAndResize"

export class FrontFaceDetect {
    detector: TinyFaceDetector
    path: string

    constructor(path: string = "/models") {
        this.detector = new TinyFaceDetector()
        this.path = path
    }

    async init() {
        await nets.tinyFaceDetector.loadFromUri(this.path)
        console.log("loading down");

    }

    async detectFace(input: HTMLCanvasElement, context?: CanvasRenderingContext2D): Promise<Area | null> {
        const face = await detectSingleFace(input, new TinyFaceDetectorOptions())
        console.log(face);

        if (face) {
            if (context) {
                const x = face.box.left
                const y = face.box.top
                const h = face.box.height
                const w = face.box.width
                context.beginPath()
                context.rect(x, y, w, h)
                context.stroke()
            }
            return face.box
        } else {
            return null
        }
    }

}