import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { CategoriesModules } from "../categories/categories.module";

@Module({
    imports:
    [TypeOrmModule.forFeature([Product]),
    CategoriesModules
    ],
    providers: [ProductsService,ProductsRepository],
    controllers: [ProductsController],
})
export class ProductsModule {}