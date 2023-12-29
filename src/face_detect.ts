import cv from "opencv-ts";

interface CascadeClassifier {
    load(src: string): void;

    detectMultiScale(input: cv.Mat, faces: cv.RectVector, v1: number, v2: number, v3: number, minSize: cv.Size, maxSize: cv.Size): void;
}

export class OpenCv {
    faceCascade?: CascadeClassifier;

    async init() {
        return new Promise<void>((resolve) => {
            cv.onRuntimeInitialized = () => {
                resolve()
                this.faceCascade = new cv.CascadeClassifier()
                console.log("load xml")
                this.faceCascade?.load('/haarcascade_frontalface_default.xml');
            }
        })
    }

    find_face(element: HTMLCanvasElement, output: HTMLCanvasElement) {
        const src = cv.imread(element);
        const gray = new cv.Mat();
        console.log("get cam input")
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
        console.log("trans color")
        const faces = new cv.RectVector();
// detect faces
        const msize = new cv.Size(0, 0);
        console.log("detecting face", this.faceCascade?.detectMultiScale)
        this.faceCascade?.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
        console.log("detect faces", faces.size())
        for (let i = 0; i < faces.size(); ++i) {
            const point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
            const point2 = new cv.Point(faces.get(i).x + faces.get(i).width, faces.get(i).y + faces.get(i).height);
            cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
        }
        cv.imshow(output, src);
        src.delete();
        gray.delete();
        faces.delete();
    }
}
