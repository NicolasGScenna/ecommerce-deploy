import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const auth = request.headers.auth;

        if(!auth)throw new UnauthorizedException ('Auth header requerido');

        const [email,password] = auth.split(':');
        if(!email||!password) throw new UnauthorizedException('Email y passwords requeridos');

        return true;

};
}