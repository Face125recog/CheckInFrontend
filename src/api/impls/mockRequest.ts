import {AbcHttpClient, Payload, SendPayload} from "../abcHttpClient.ts";

export class MockRequest extends AbcHttpClient {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    responseList: Record<string, object[]>;
    respIdx: Record<string, number> = {};


    constructor(resposeList: Record<string, object[]>) {
        super();
        this.responseList = resposeList
        for (const key in resposeList) {
            this.respIdx[key] = 0
        }
    }

    send<T>({path}: SendPayload): Promise<Payload<T>> {
        const resp = this.responseList[path][this.respIdx[path]]
        this.respIdx[path] += 1;

        return new Promise((res) => {
            res({data: resp as T})
        })


    }
}