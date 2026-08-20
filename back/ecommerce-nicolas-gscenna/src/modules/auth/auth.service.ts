import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository){}
    
    getAuth() {
        return 'Get all auth';
    }
    async signIn(credentials: {email:string,password:string}){
        const {email, password} = credentials;
        if(!email||!password) throw new UnauthorizedException('Email o contraseña incorrectos');

        const user = await this.usersRepository.getByEmail(email);
        if(!user||user.password!==password) throw new UnauthorizedException('Email o contraseña incorrectos');

        return {message: 'Login exitoso', user}
    }
}