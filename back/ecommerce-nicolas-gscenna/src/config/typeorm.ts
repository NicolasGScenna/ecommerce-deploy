import { DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from 'dotenv';
import { DataSource } from "typeorm/browser";
import { registerAs } from "@nestjs/config";

dotenvConfig({path: '.env.development'});

const config= {
    type:'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    synchronize:false,
    logging:true,
    entities:['dist/**/*.entity{.ts,.js}'],
    migrations:['dist/migrations/*{.ts,.js}']
};
export default registerAs('typeorm',()=>config);
export const connectionSource = new DataSource(config as DataSourceOptions);