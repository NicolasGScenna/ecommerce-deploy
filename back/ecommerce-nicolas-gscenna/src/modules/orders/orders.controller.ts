import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { IdParamDto } from "../../dto/id-param.dto";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController{
    constructor(private readonly ordersService: OrdersService){}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    addOrder(@Body() createOrderDto: CreateOrderDto){
        return this.ordersService.addOrder(createOrderDto)
    };

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
    async getOrder(@Param()params : IdParamDto){
        const order = await this.ordersService.getOrder(params.id)
        if(!order) throw new NotFoundException ('Orden de compra no encontrada')
        return order;
    }
}