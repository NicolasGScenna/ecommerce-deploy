import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor( @InjectRepository(User) private readonly usersRepository : Repository<User>){}

    async getUsers(page:number,limit:number){
        const users = await this.usersRepository.find({
            skip: (page-1)*limit,
            take: limit,
        })
        return users.map(({ password,...user})=>user)
    };

    async getById(id:string){
        const user = await this.usersRepository.findOne({
            where: {id},
            relations:{
                orders:true
            }
       });
       if(!user) return undefined
       const {password,orders,...userWithoutPassword} = user;

       return {...userWithoutPassword,
        orders: orders.map(order=>({
            id:order.id,
            date:order.date,
        }))
       }
    }
    async getByEmail(email:string){
        return this.usersRepository.findOne({
            where: {email}
        });
    }
    async createUser(user: Omit<User,'id'|'orders'>): Promise<string> {
        const newUser = this.usersRepository.create(user);
        const savedUser = this.usersRepository.save(newUser);
        return (await savedUser).id
    }
    
    async deleteUser(id:string):Promise<string|undefined>{
        const result = await this.usersRepository.delete(id);
        if(!result.affected) return undefined
        return id
    }
    async updateUser(id:string, user: Partial<Omit<User,'id'|'orders'>>):Promise<string|undefined>{
        const userExists = await this.usersRepository.findOne({
            where: {id}
        })
        if(!userExists)return undefined
        await this.usersRepository.update(id,user)

        return id;
    }
}

