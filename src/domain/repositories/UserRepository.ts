import type { User } from "../user/User.js";

export interface UserRepository{
    findById(id:string):Promise<User|null>;
    save(user:User):Promise<User>;
}