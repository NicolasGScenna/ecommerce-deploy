import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async getProducts(
        page: number,
        limit: number,
    ): Promise<Product[]> {
        return this.productRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: {
                category: true,
            },
        });
    }

    async getById(
        id: string,
    ): Promise<Product | null> {
        return this.productRepository.findOne({
            where: { id },
            relations: {
                category: true,
            },
        });
    }

    async createProduct(
        product: DeepPartial<Product>,
    ): Promise<string> {
        const newProduct =
            this.productRepository.create(product);

        const savedProduct =
            await this.productRepository.save(newProduct);

        return savedProduct.id;
    }

    async updateProduct(
        id: string,
        product: DeepPartial<Product>,
    ): Promise<string | undefined> {
        const productExists =
            await this.productRepository.findOne({
                where: { id },
            });

        if (!productExists) {
            return undefined;
        }

        await this.productRepository.update(id, product);

        return id;
    }

    async deleteProduct(
        id: string,
    ): Promise<string | undefined> {
        const result =
            await this.productRepository.delete(id);

        if (!result.affected) {
            return undefined;
        }

        return id;
    }

    async addProducts(
        products: DeepPartial<Product>[],
    ): Promise<Product[]> {
        const newProducts =
            this.productRepository.create(products);

        return this.productRepository.save(newProducts);
    }
}