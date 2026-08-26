import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginUserDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description:'El email del usuario a loggear, debe existir en la DB',
        example:'nicolasg@email.com',
      })
    email:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description:'Debe ser la contraseña con la que el usuario ha sido registrado',
        example:'Password2!',
      })
    password:string;
}