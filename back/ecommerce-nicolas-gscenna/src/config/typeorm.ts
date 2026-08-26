import { DataSourceOptions, DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/cateogry.entity';
import { Order } from '../entities/order.entity';
import { OrderDetail } from '../entities/order-details.entity';

dotenvConfig({ path: '.env.development' });

const config: DataSourceOptions = {
  type: 'postgres',

  database: process.env.DB_NAME,

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  username: process.env.DB_USER,

  password: process.env.DB_PASS,

  synchronize: false,

  logging: true,

  entities: [
    User,
    Product,
    Category,
    Order,
    OrderDetail,
  ],

  migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);