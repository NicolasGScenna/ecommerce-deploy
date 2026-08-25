import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';

import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';

@Entity('order_details')
export class OrderDetail {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number;

    @ManyToOne(
        () => Order,
        order => order.orderDetails,
    )
    order: Order;

    @ManyToMany(
        () => Product,
        product => product.orderDetails,
    )
    @JoinTable()
    products: Product[];
}