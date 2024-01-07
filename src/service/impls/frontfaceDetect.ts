import {AbcFaceDetect, FaceLocal, FaceOwner, FaceRegister, Size} from "../abcFaceDetect.ts";
import {blobToBase64} from "../../imageProcess/fetchFromElement.ts";
import {addingFace} from "../../api/callApi/addingFaceApi.ts";
import {userCheckIn} from "../../api/callApi/checkIn.ts";
import {AbcHttpClient} from "../../api/abcHttpClient.ts";
import {FrontFaceDetect} from "../../imageProcess/faceDetect.ts";
import {AxiosRequest} from "../../api/impls/axiosRequest.ts";

export class FrontFaceDetectService extends AbcFaceDetect {
    private static instance?: FrontFaceDetectService
    recommendSize?: Size = undefined
    faceDetector: FrontFaceDetect = new FrontFaceDetect()
    requestClient: AbcHttpClient

    private constructor(client: AbcHttpClient) {
        super();
        this.requestClient = client
    }

    public static async getInstance(client: AbcHttpClient = AxiosRequest.getInstance()) {
        if (FrontFaceDetectService.instance)
            return FrontFaceDetectService.instance
        else {
            FrontFaceDetectService.instance = new FrontFaceDetectService(client)
            await FrontFaceDetectService.instance.init()
            return FrontFaceDetectService.instance
        }
    }

    async init() {
        await this.faceDetector.init()
    }

    async addingFace<T>(register: FaceRegister<T>, context: T, times: number, authorize: string, owner: FaceOwner): Promise<void> {
        const faceList: string[] = []

        for (let i = 0; i < times; i++) {
            //2. 进行 times 次带人脸的采集
            const face = await register.nextFace(this, context)
            const base64Face = await blobToBase64(face)

            faceList.push(base64Face)
        }

        await addingFace(this.requestClient, {faces: faceList, user: owner}, authorize)
    }

    async faceMatch(inputImg: Blob, miniConfidence: number): Promise<FaceOwner> {
        // 转换为base64
        const base64Face = await blobToBase64(inputImg)
        return await userCheckIn(this.requestClient, {face: base64Face, min_confidence: miniConfidence})
    }

    async faceDetect(inputImg: HTMLCanvasElement, miniSize?: Size): Promise<FaceLocal | null> {
        const face = await this.faceDetector.detectFace(inputImg)
        if (!face) return null

        if (miniSize && (face.width < miniSize?.height || face.height < miniSize?.height)) {
            return null
        }
        return {
            x: face.left, y: face.top, size: {width: face?.width, height: face?.height}

        }
    }


}