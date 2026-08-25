import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class OrderProductDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}

export class CreateOrderDto {
    @IsUUID('4')
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    products: OrderProductDto[];
}