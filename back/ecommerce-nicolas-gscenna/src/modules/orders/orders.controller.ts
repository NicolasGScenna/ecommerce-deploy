import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { IdParamDto } from "src/dto/id-param.dto";

@Controller('orders')
export class OrdersController{
    constructor(private readonly ordersService: OrdersService){}
    @Post()
    addOrder(@Body() createOrderDto: CreateOrderDto){
        return this.ordersService.addOrder(createOrderDto)
    };
    @Get(':id')
    async getOrder(@Param()params : IdParamDto){
        const order = await this.ordersService.getOrder(params.id)
        if(!order) throw new NotFoundException ('Orden de compra no encontrada')
        return order;
    }
}