import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { User } from '../entities/user.entity';
import { OrderDetail } from '../entities/order-details.entity';

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => User,
    user => user.orders,
  )
  user: User;

  @Column({
    type: 'timestamp',
    default: ()=> 'CURRENT_TIMESTAMP'
  })
  date: Date;

@OneToMany(
    () => OrderDetail,
    orderDetail => orderDetail.order,
)
orderDetails: OrderDetail[];
}