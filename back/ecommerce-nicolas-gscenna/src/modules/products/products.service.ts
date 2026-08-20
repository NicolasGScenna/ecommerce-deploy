import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { IProduct } from "./interfaces/product.interface";

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository
    ){}

    async getProducts(page:number,limit:number): Promise<IProduct[]> {
        return this.productsRepository.getProducts(page,limit);
    }
    async getProductById(id:number):Promise <IProduct|undefined>{
        return this.productsRepository.getProductById(id);
    }
    async createProduct(product: Omit<IProduct,'id'>): Promise<number>{
        return this.productsRepository.createProduct(product);
    }
    async updateProduct(id:number,product:Omit<IProduct,'id'>):Promise<number|undefined>{
        return this.productsRepository.updateProduct(id,product);
    }
    async deleteProduct(id:number):Promise<number|undefined>{
        return this.productsRepository.deleteProduct(id);
    }
}