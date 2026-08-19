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

    getUsers(): IUser[] {
        return this.users;
    }
}

