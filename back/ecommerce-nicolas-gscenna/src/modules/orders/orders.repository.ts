import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "../../entities/order-details.entity";
import { Order } from "../../entities/order.entity";
import { Product } from "../../entities/product.entity";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersRepository{
    constructor (
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private readonly orderDetailsRepository: Repository<OrderDetail>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ) {}


    async getOrder(id:string): Promise <Order>{
        const order = await this.ordersRepository.findOne({
            where: {id},
            relations: {
                user:true,
                orderDetails:{
                    products:true,
                },
            },
        });
        if(!order)throw new NotFoundException('Orden no encontrada');
        return order;
    }
    async addOrder(createOrderDto: CreateOrderDto): Promise<Order>{
        const {userId,products} = createOrderDto
        const user = await this.usersRepository.findOne({
            where: {id: userId},
        });
        if (!user)throw new NotFoundException('Usuario no encontrado');

        const productsIds = products.map(product=>product.id);
        const uniqueProductsIds = [...new Set(productsIds)];
        const productsFound = await this.productsRepository.
        createQueryBuilder('product')
        .where('product.id IN (:...ids)',{
            ids: uniqueProductsIds,
        })
        .andWhere('product.stock > 0')
        .getMany();

        if(productsFound.length!== uniqueProductsIds.length)
            throw new BadRequestException('Uno o más productos no existen o no están en stock')

        const order = this.ordersRepository.create({user});
        const savedOrder = await this.ordersRepository.save(order)
        const totalPrice = productsFound.reduce(
            (total,product)=>
                total + Number(product.price),0
        );
        productsFound.forEach(product=>{
            product.stock -= 1;
        });
        await this.productsRepository.save(productsFound);

        const orderDetail =
            this.orderDetailsRepository.create({
                price:totalPrice,
                products:productsFound,
                order:savedOrder
            })

        await this.orderDetailsRepository.save(orderDetail)
        return this.getOrder(savedOrder.id);
    }

}