import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "src/entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ){}

    async getUsers(page:number,limit:number): Promise<Omit<User,'password'>[]>{
        return this.usersRepository.getUsers(page,limit);
    }
    async getUserById(id:string): Promise<Omit<User,'password'|'orders'> | undefined>{
        return this.usersRepository.getById(id);
    }
    async createUser(user: Omit<User,'id'|'orders'>): Promise<string> {
        return this.usersRepository.createUser(user);
    }
    async updateUser(id:string, user: Omit<User,'id'|'orders'>):Promise< string | undefined >{
        return this.usersRepository.updateUser(id,user);
    }
    async deleteUser(id:string):Promise<string|undefined>{
        return this.usersRepository.deleteUser(id);
    }
    
}
