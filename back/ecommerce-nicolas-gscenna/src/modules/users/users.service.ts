import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { IUser } from "./interfaces/user.interface";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ){}

    async getUsers(page:number,limit:number): Promise<Omit<IUser,'password'>[]>{
        return this.usersRepository.getUsers(page,limit);
    }
    async getUserById(id:number): Promise<Omit<IUser,'password'> | undefined>{
        return this.usersRepository.getById(id);
    }
    async createUser(user: Omit<IUser,'id'>): Promise<number> {
        return this.usersRepository.createUser(user);
    }
    async updateUser(id:number, user: Omit<IUser,'id'>):Promise< number | undefined >{
        return this.usersRepository.updateUser(id,user);
    }
    async deleteUser(id:number):Promise<number|undefined>{
        return this.usersRepository.deleteUser(id);
    }
    
}
