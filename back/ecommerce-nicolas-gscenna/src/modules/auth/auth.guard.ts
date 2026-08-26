import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if(!authHeader)throw new UnauthorizedException('Token requerido');

        const [type,token] = authHeader?.split(' ')??''

        if(type!=='Bearer'||!token)throw new UnauthorizedException('Token invalido');

        try {
            const playload = this.jwtService.verify(token);
            playload.iat = new Date(playload.iat*1000);
            playload.exp= new Date(playload.exp*1000);
            request.user= playload;
            request.tokenExpiration = playload.exp;
            return true;
        } catch (error) {
            throw new UnauthorizedException ('Token invalido')
        }
    }
}