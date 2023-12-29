import cv from "opencv-ts";

export class OpenCv {
    faceCascade: any;

    async init() {
        return new Promise<void>((resolve) => {
            cv.onRuntimeInitialized = () => {
                resolve()
                this.faceCascade = new cv.CascadeClassifier()
                console.log("load xml")
                this.faceCascade.load('/haarcascade_frontalface_default.xml');
            }
        })
    }

    find_face(element:HTMLCanvasElement,output:HTMLCanvasElement) {
        let src = cv.imread(element);
        let gray = new cv.Mat();
        console.log("get cam input")
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
        console.log("trans color")
        let faces = new cv.RectVector();
// detect faces
        let msize = new cv.Size(0, 0);
        console.log("detecting face",this.faceCascade.detectMultiScale)
        this.faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
        console.log("detect faces", faces.size())
        for (let i = 0; i < faces.size(); ++i) {
            let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
            let point2 = new cv.Point(faces.get(i).x + faces.get(i).width, faces.get(i).y + faces.get(i).height);
            cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
        }
        cv.imshow(output, src);
        src.delete();
        gray.delete();
        faces.delete();
    }
}
