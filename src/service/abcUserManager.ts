
export interface User {
    name: string,
    identity: number
}

export abstract class AbcUserManager {
    abstract allUser(): Promise<User[]>
    abstract removeUser(identity: number): Promise<void>
    abstract addUser(user: User): Promise<void>
}