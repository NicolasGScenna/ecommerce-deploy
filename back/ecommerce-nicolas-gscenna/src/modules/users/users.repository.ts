import { Injectable } from "@nestjs/common";
import { IUser } from "./interfaces/user.interface";

@Injectable()
export class UsersRepository {
    private users: IUser[] = [
        {
            id: 1,
            name: "Nicolás Scenna",
            email: "nicolas.scenna@example.com",
            password: "Password123!",
            address: "Av. Corrientes 1234",
            phone: "+54 11 5555-0001",
            country: "Argentina",
            city: "Buenos Aires",
        },
        {
            id: 2,
            name: "Ana García",
            email: "ana.garcia@example.com",
            password: "Password123!",
            address: "Calle Florida 456",
            phone: "+54 11 5555-0002",
            country: "Argentina",
            city: "Buenos Aires",
        },
        {
            id: 3,
            name: "Carlos López",
            email: "carlos.lopez@example.com",
            password: "Password123!",
            address: "Calle San Martín 789",
            phone: "+54 11 5555-0003",
            country: "Argentina",
            city: "Córdoba",
        },
        {
            id: 4,
            name: "Sofía Martínez",
            email: "sofia.martinez@example.com",
            password: "Password123!",
            address: "Av. Pellegrini 321",
            phone: "+54 341 555-0004",
            country: "Argentina",
            city: "Rosario",
        },
        {
            id: 5,
            name: "Diego Fernández",
            email: "diego.fernandez@example.com",
            password: "Password123!",
            address: "Calle Belgrano 654",
            phone: "+54 11 5555-0005",
            country: "Argentina",
            city: "Mendoza",
        },
    ];

    async getUsers(page:number,limit:number): Promise<Omit<IUser,'password'>[]>{
        const start = (page-1)*limit;
        const end = start + limit;
        return this.users.slice(start,end).map(({password,...user})=>user);
    }
    async getById(id:number): Promise<Omit<IUser,'password'> | undefined>{
        const user = this.users.find(user=>user.id===id);
        if(!user){
            return undefined
        }
        const {password,...userWithoutPassword} = user;

        return userWithoutPassword
    }
    async getByEmail(email:string):Promise<IUser|undefined>{
        return this.users.find(user=>user.email===email);
    }
    async createUser(user: Omit<IUser,'id'>): Promise<number>{
        const id = this.users.length>0 ? Math.max(...this.users.map(user=>user.id))+1 : 1
        this.users = [...this.users, {id,...user}]
        return id
    }
    async updateUser(id:number,user:Omit<IUser,'id'>):Promise <number|undefined>{
        const userIndex = this.users.findIndex(user=>user.id===id);
        if (userIndex==-1)return undefined
        this.users[userIndex]={id,...user}
        return id;
    }
    async deleteUser(id:number):Promise<number|undefined>{
        const userExists = this.users.some(user=>user.id===id)
        if(!userExists)return undefined
        this.users = this.users.filter(user=>user.id!==id)
        return id;
    }
}

