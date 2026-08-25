import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetail } from "src/entities/order-details.entity";
import { Order } from "src/entities/order.entity";
import { Product } from "src/entities/product.entity";
import { User } from "src/entities/user.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            Order,
            OrderDetail,
            User,
            Product,
        ])
    ],
    controllers:[OrdersController],
    providers:[OrdersService,OrdersRepository]
})
export class OrdersModule {}
