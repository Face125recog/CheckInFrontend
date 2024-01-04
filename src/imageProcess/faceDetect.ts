import { TinyFaceDetector, TinyFaceDetectorOptions, detectAllFaces, nets, tinyFaceDetector } from "@vladmandic/face-api"
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

    async detectFace(input: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        const faces = await detectAllFaces(input, new TinyFaceDetectorOptions())
        console.log(faces);
        
        for (let index = 0; index < faces.length; index++) {
            const face = faces[index];
            const x = face.box.left
            const y = face.box.top
            const h = face.box.height
            const w = face.box.width
            context.beginPath()
            context.rect(x,y,w,h)
            context.stroke()

        }
    }

}