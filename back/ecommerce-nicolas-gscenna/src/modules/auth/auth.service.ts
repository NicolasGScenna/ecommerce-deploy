import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { LoginUserDto } from "./dto/logis-user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository){}
    
    getAuth() {
        return 'Get all auth';
    }
    async signIn(loginUserDto: LoginUserDto){
        const {email, password} = loginUserDto;
        if(!email||!password) throw new UnauthorizedException('Email o contraseña incorrectos');

        const user = await this.usersRepository.getByEmail(email);
        if(!user||user.password!==password) throw new UnauthorizedException('Email o contraseña incorrectos');

        return {message: 'Login exitoso', user}
    }
}