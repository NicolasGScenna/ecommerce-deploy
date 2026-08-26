import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/logis-user.dto";
import { SignupUserDto } from "./dto/signup-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auths')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getAuth() {
        return this.authService.getAuth();
    }
    @Post('signin')
    signin(@Body() loginUserDto: LoginUserDto){
        return this.authService.signIn(loginUserDto);
    }
    @Post('signup')
    signup(@Body() signupUserDto: SignupUserDto){
        return this.authService.signUp(signupUserDto);
    }
}