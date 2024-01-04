import {AbcFaceDetect, FaceLocal, FaceOwner, FaceRegister, Size} from "../abcFaceDetect.ts";
import {FrontFaceDetect} from "../../imageProcess/faceDetect.ts";
import {AxiosRequest} from "../../api/impls/axiosRequest.ts";
import {blobToBase64} from "../../imageProcess/fetchFromElement.ts";

export class FrontFaceDetectService extends AbcFaceDetect {
    recommendSize?: Size = null
    faceDetector: FrontFaceDetect = new FrontFaceDetect()
    requestClient: AxiosRequest = new AxiosRequest()

    async addingFace<T>(register: FaceRegister<T>, context: T, times: number, authorize: string): Promise<void> {
        // 1. fetch a context from backend, to keep state
        const contextResp = await this.requestClient
            .send<string>("POST", "/user/face/context", "text/plain", undefined, undefined, authorize)
        const contextToken = contextResp.data;

        for (let i = 0; i < times; i++) {
            //2. 进行 times 次带人脸的采集
            const face = await register.nextFace(this, context)
            const base64Face = await blobToBase64(face)

            await this.requestClient.send("POST", "/user/face/upload", "application/json", {
                "face-context": contextToken
            }, {
                face: base64Face
            }, authorize)
        }
    }

    async faceMatch(inputImg: Blob, miniConfidence: number): Promise<FaceOwner> {
        // 转换为base64
        const base64Face = await blobToBase64(inputImg)
        const ownerPayload = await this.requestClient.send<FaceOwner>("POST", "/detect/match", "application/json", undefined, {
            face: base64Face, mini_confidence: miniConfidence
        })
        return ownerPayload.data
    }

    async faceDetect(inputImg: HTMLCanvasElement, miniSize?: Size): Promise<FaceLocal> {
        const face = await this.faceDetector.detectFace(inputImg, inputImg.getContext("2d"))
        if (!face) return null

        if (miniSize && face.width < miniSize?.height || face.height < miniSize?.height) {
            return null
        }
        return {
            x: face.left, y: face.top, size: {width: face?.width, height: face?.height}

        }
    }
}

}