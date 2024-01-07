import {AbcHttpClient} from "../abcHttpClient.ts";

export interface UserCheckIn {
    /**
     * 人脸，人脸使用PNG进行图片编码，Base64进行二进制编码
     */
    face: string;
    /**
     * 最小置信度，当模型输出全部小于最小置信度，视为未找到匹配人脸
     */
    min_confidence: number;
}

/**
 * 成功时响应内容
 *
 * 用户信息
 */
export interface UserInfo {
    /**
     * 用户唯一标识ID
     */
    identity: number;
    /**
     * 用户名称
     */
    name: string;
}


export async function userCheckIn(client: AbcHttpClient, checkIn: UserCheckIn): Promise<UserInfo> {
    const resp = await client.send<UserInfo>({
        contentType: "application/json",
        method: "POST",
        path: "/check_in",
        payload: checkIn
    })
    return resp.data!
}

