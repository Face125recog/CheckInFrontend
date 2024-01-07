import {UserInfo} from "./checkIn.ts";
import {AbcHttpClient} from "../abcHttpClient.ts";
import {AuthorizeToken} from "./admin.ts";

export interface AddingFace {
    /**
     * 采集人脸，图片编码为PNG,使用Base64编码二进制
     */
    faces: string[];
    user: UserInfo;
}

export async function addingFace(client: AbcHttpClient, payload: AddingFace, authorize: AuthorizeToken): Promise<void> {
    await client.send({
        path: "/user_register/upload",
        contentType: "application/json",
        method: "POST",
        payload,
        authorize
    })
}

