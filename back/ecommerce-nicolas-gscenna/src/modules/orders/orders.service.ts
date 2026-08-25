import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersService{
    constructor(private readonly ordersRepository: OrdersRepository){}

    async getOrder(id:string){
        return this.ordersRepository.getOrder(id);
    }
    async addOrder(createOrderDto: CreateOrderDto){
        return this.ordersRepository.addOrder(createOrderDto)
    }
}