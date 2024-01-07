import axios, {AxiosHeaders, AxiosInstance} from "axios"
import {AbcHttpClient, Payload, SendPayload} from "../abcHttpClient.ts"

const BASE_URL = "http://127.0.0.1:4523/m1/3863270-0-default"


export class AxiosRequest extends AbcHttpClient {
    instance: AxiosInstance

    constructor() {
        super()
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: 1500,
            withCredentials: true
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
            throw new Error(`Axios Request Error: ${err}`)
        });

        if (resp.status < 300) {
            return resp.data
        } else {
            throw new Error(`Request Failure: ${resp.status} ${resp.statusText} | ${resp.data.errty} ${resp.data.errmsg}`)
        }
    }
}

const AXIOS_INSTANCE = new AxiosRequest()