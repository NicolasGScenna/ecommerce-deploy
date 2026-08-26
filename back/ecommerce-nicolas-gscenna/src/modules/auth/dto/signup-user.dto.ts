import { IsNotEmpty, IsString, Matches } from "class-validator";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class SignupUserDto extends CreateUserDto{
    @IsNotEmpty()
    @IsString()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        {
            message:
                "La contraseña debe tener al menos una minuscula, una mayuscula, un numero y uno de los siguientes caracteres: !@#$%^&*",
        },
    )
    @ApiProperty({
        description:'Debe coincidir con la contraseña ingresada previamente',
        example:'MyPassword123#!',
      })
    confirmPassword: string;
}