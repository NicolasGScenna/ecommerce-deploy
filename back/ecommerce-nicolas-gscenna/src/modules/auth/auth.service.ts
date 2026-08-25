import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { LoginUserDto } from "./dto/logis-user.dto";
import * as bcrypt from 'bcrypt';
import { SignupUserDto } from "./dto/signup-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ){}
    
    getAuth() {
        return 'Get all auth';
    }
    async signIn(loginUserDto: LoginUserDto){
        const {email,password}=loginUserDto;
        const user = await this.usersRepository.getByEmail(email);
        if(!user)throw new UnauthorizedException('Email o contraseña incorrectos');
        const passwordValid = await bcrypt.compare(password,user.password);
        if(!passwordValid)throw new UnauthorizedException('Email o contraseña incorrectos');
        const token = this.jwtService.sign({
            id:user.id,
            email:user.email,
        });
        const{password:_,...userWithoutPassword}=user;
        return{
            user: userWithoutPassword,
            token,
        }
    }
    async signUp(signUpUserDto:SignupUserDto){
        const {password,confirmPassword,...userData} = signUpUserDto

        if(!password||!confirmPassword)throw new BadRequestException('Debe ingresar y confirmar la contraseña');

        if(password!==confirmPassword)throw new BadRequestException('Las contraseñas no coinciden');

        const hashedPassword = await bcrypt.hash(password,10);

        const id = await this.usersRepository.createUser({
            ...userData,
            password:hashedPassword
        })

        const user = await this.usersRepository.getById(id);

        return user;
    }

}