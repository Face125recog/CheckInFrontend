import {AbcUserManager, User} from "../abcUserManager.ts";
import {AuthorizeToken} from "../../api/callApi/admin.ts";
import {deleteUser} from "../../api/callApi/userManager/deleteUser.ts";
import {AbcHttpClient} from "../../api/abcHttpClient.ts";
import {AxiosRequest} from "../../api/impls/axiosRequest.ts";
import {fetchUserInfoList} from "../../api/callApi/userManager/fetchUserInfoList.ts";
import {userCount} from "../../api/callApi/userManager/userCount.ts";


export class FrontUserManager extends AbcUserManager {
    static INSTANCE?: FrontUserManager = undefined

    client: AbcHttpClient


    constructor(client: AbcHttpClient) {
        super();
        this.client = client
    }

    public static getInstance(client: AbcHttpClient = AxiosRequest.getInstance()): AbcUserManager {
        if (FrontUserManager.INSTANCE) {
            return FrontUserManager.INSTANCE
        } else {
            FrontUserManager.INSTANCE = new FrontUserManager(client)
            return FrontUserManager.INSTANCE
        }
    }

    async allUser(authorize: AuthorizeToken, pageSize: number, page: number): Promise<User[]> {
        return await fetchUserInfoList(this.client, pageSize, page, authorize)
    }

    async removeUser(identity: number, authorize: AuthorizeToken): Promise<void> {
        await deleteUser(this.client, identity, authorize)
    }

    async userNumber(authorize: AuthorizeToken): Promise<number> {
        return await userCount(this.client, authorize)
    }

}