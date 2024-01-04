
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

export interface FaceRegister<T>{
    nextFace:(detector:AbcFaceDetect,context:T)=>Promise<Blob>;
}

export abstract class AbcFaceDetect {
    abstract recommandSize?: Size

    abstract feceDetect(inputImg: Blob | HTMLImageElement, miniSize?: Size): Promise<FaceLocal>

    abstract faceMatch(inputImg: Blob, miniConfidence: number): Promise<FaceOwner>

    abstract addingFace<T>(register:FaceRegister<T>,context:T,times:number):Promise<void>
        
}