import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { IdParamDto } from "src/dto/id-param.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('orders')
export class OrdersController{
    constructor(private readonly ordersService: OrdersService){}
    @UseGuards(AuthGuard)
    @Post()
    addOrder(@Body() createOrderDto: CreateOrderDto){
        return this.ordersService.addOrder(createOrderDto)
    };
    @UseGuards(AuthGuard)
    @Get(':id')
    async getOrder(@Param()params : IdParamDto){
        const order = await this.ordersService.getOrder(params.id)
        if(!order) throw new NotFoundException ('Orden de compra no encontrada')
        return order;
    }
}