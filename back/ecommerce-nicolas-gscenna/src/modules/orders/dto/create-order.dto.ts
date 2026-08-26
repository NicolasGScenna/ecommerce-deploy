import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class OrderProductDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Es el id de un producto',
        example: 'id : UN_UUID_DE_UN_PRODUCTO'
    })
    id: string;
}

export class CreateOrderDto {
    @IsUUID('4')
    @IsNotEmpty()
    @ApiProperty({
        description:"Es el id de el usuario que va a generar la orden de compra",
        example:`"userId: "UN_UUID_DE_UN_USER"`
    })
    userId: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    @ApiProperty({
        description:'Es un array de los IDS de los productos que se quieren agregar a la orden',
        example:`"products": [
        {
            "id": "UN_UUID_DE_UN_PRODUCTO",
        },
        {
            "id": "UN_UUID_DE_UN_PRODUCTO",
        },
        {
            "id":"UN_UUID_DE_UN_PRODUCTO",
        }
            ]`,
      })
    products: OrderProductDto[];
}