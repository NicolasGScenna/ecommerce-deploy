import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsString } from "class-validator";

export class CreateProductDto{
    @IsString()
    @ApiProperty({
        description:'Debe ser el nombre del producto',
        example:'IPhone 17 Air',
      })
    name:string;

    @IsString()
    @ApiProperty({
        description:'Debe otorgar una descripción del producto',
        example:'El smartphone más delgado de Apple',
  })
    description:string;

    @IsNumber()
    @ApiProperty({
        description:'Es el precio del producto, puede tener solo 2 cifras decimales',
        example:'749.99',
  })
    price:number;

    @IsNumber()
    @ApiProperty({
        description:'Es el stock del producto, debe ser un numero entero',
        example:'10',
  })
    stock: number;

    @IsString()
    @ApiProperty({
        description:'Es la ruta a la imagen del producto',
        example:'http://iphone17air/example.jpg',
  })
    imgUrl:string;
}