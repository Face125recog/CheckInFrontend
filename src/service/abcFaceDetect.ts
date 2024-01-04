
export interface Size {
    width: number,
    height: number
}

export interface FaceLocal {
    size: Size,
    x: number,
    y: number
}

export interface FaceOwner {
    name: string,
    identity: number
}

export abstract class AbcFaceDetect {
    abstract recommandSize?: Size

    abstract feceDetect(inputImg: Blob | HTMLImageElement, miniSize?: Size): Promise<FaceLocal>

    abstract faceMatch(inputImg: Blob, miniConfidence: number): Promise<FaceOwner>
}