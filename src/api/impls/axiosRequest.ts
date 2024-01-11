import axios, {AxiosHeaders, AxiosInstance, AxiosResponse} from "axios"
import {AbcHttpClient, Payload, SendPayload} from "../abcHttpClient.ts"

// const BASE_URL = "http://192.168.1.118:5000"

const BASE_URL = "http://127.0.0.1:4523/m1/3863270-0-default"


export class AxiosRequest extends AbcHttpClient {
    instance: AxiosInstance

    constructor() {
        super()
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: 15000,
            // withCredentials: true
        })
    }

    public static getInstance() {
        return AXIOS_INSTANCE
    }

    async send<T>({contentType, authorize, payload, query, method, path}: SendPayload): Promise<Payload<T>> {
        const headers = new AxiosHeaders()

        headers.setContentType(contentType)
        if (authorize) {
            headers.setAuthorization(authorize)
        }

        const resp = await this.instance.request<Payload<T>>({
            url: path,
            method: method,
            params: query,
            data: payload,
            headers: headers
        }).catch((err) => {
            const errResp: AxiosResponse<Payload<T>> = err.response
            throw new Error(`Request Failure: [${errResp.data.errty}]: ${errResp.data.errmsg}`)
        });

        return resp.data
    }
}

const AXIOS_INSTANCE = new AxiosRequest()