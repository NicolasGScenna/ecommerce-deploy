import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
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
  })
  date: Date;

  @OneToOne(
    () => OrderDetail,
    orderDetail => orderDetail.order,
  )
  orderDetail: OrderDetail;
}