import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import { Category } from '../entities/cateogry.entity';
import { OrderDetail } from '../entities/order-details.entity';

@Entity('products')
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'integer',
  })
  stock: number;

  @Column({
    type: 'varchar',
    default: 'https://example.com/default-product.jpg',
  })
  imgUrl: string;

  @ManyToOne(
    () => Category,
    category => category.products,
  )
  category: Category;

  @ManyToMany(
    () => OrderDetail,
    orderDetail => orderDetail.products,
  )
  orderDetails: OrderDetail[];
}