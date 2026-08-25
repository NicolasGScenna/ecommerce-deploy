import { IsNotEmpty, IsString, Matches } from "class-validator";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";

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
    confirmPassword: string;
}