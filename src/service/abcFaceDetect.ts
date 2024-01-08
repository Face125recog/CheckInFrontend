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

export interface FaceRegister<T> {
    /**
     * Load Next available face
     *
     * 1. using provided detector find face
     * 2. using image-process function crop the face
     * 3. return the croped face
     *
     * Note: if no face found, try fetch face until detect face
     *
     * @param T provided context to determine the env
     * @return Blob the binary data content the crop face
     */
    nextFace: (detector: AbcFaceDetect, context: T) => Promise<Blob>;
}

export abstract class AbcFaceDetect {
    abstract recommendSize?: Size

    async init(): Promise<void> {
    }

    abstract faceDetect(inputImg: HTMLCanvasElement, miniSize?: Size): Promise<FaceLocal | null>

    abstract faceMatch(inputImg: Blob, miniConfidence: number): Promise<FaceOwner>

    abstract addingFace<T>(register: FaceRegister<T>, context: T, times: number, authorize: string, user: FaceOwner): Promise<void>

}