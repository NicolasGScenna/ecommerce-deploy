import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinColumn,
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

  @OneToOne(
    () => Order,
    order => order.orderDetail,
  )
  @JoinColumn()
  order: Order;

  @ManyToMany(
    () => Product,
    product => product.orderDetails,
  )
  products: Product[];
}