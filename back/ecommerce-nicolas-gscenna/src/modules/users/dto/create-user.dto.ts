import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description:'El nombre del usuario debe tener al menos 3 caracteres',
    example:'Nicolas',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description:'El email debe ser válido',
    example:'nico@mail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
    {message:"La contraseña debe tener al menos una minuscula,una mayuscula,un numero y uno de los siguientes caracteres: !@#$%^&*"}
  )
  @ApiProperty({
    description:'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un caracter especial',
    example:'MyPassword123#!',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description:'La dirección debe tener al menos 3 caracteres',
    example:'Avenida Siempre Viva 123',
  })
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description:'El número es un obligatorio y debe ser un número valido',
    example:'12345678',
  })
  phone: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description:'El país es opcional, pero debe tener al menos 5 caracteres',
    example:'Argentina',
  })
  country?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description:'La ciudad es opcional, pero debe tener al menos 5 caracteres',
    example:'Rosario',
  })
  city?: string;
}