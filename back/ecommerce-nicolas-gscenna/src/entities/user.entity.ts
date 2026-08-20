import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Order } from '../entities/order.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  password: string;

  @Column({
    type: 'integer',
  })
  phone: number;
  
  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  country?: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  city?: string;

  @OneToMany(
    () => Order,
    order => order.user,
  )
  orders: Order[];
}