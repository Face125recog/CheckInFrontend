import {AbcHttpClient} from "../../abcHttpClient.ts";
import {AuthorizeToken} from "../admin.ts";

export async function deleteUser(client: AbcHttpClient, userId: number, authorize: AuthorizeToken): Promise<void> {
    await client.send({
        contentType: "text/plain",
        method: "POST",
        path: "/user/delete",
        query: {uid: userId.toString(10)},
        authorize
    })
}