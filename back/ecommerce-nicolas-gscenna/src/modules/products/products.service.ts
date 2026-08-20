import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { IProduct } from "./interfaces/product.interface";
import { CategoriesRepository } from "../categories/categories.repository";

const products = [
      {
        name: 'Iphone 15',
        description: 'The best smartphone in the world',
        price: 199.99,
        stock: 12,
        category: 'smartphone',
      },
      {
        name: 'Samsung Galaxy S23',
        description: 'The best smartphone in the world',
        price: 150.0,
        stock: 12,
        category: 'smartphone',
      },
      {
        name: 'Motorola Edge 40',
        description: 'The best smartphone in the world',
        price: 179.89,
        stock: 12,
        category: 'smartphone',
      },
      {
        name: 'Samsung Odyssey G9',
        description: 'The best monitor in the world',
        price: 299.99,
        stock: 12,
        category: 'monitor',
      },
      {
        name: 'LG UltraGear',
        description: 'The best monitor in the world',
        price: 199.99,
        stock: 12,
        category: 'monitor',
      },
      {
        name: 'Acer Predator',
        description: 'The best monitor in the world',
        price: 150.0,
        stock: 12,
        category: 'monitor',
      },
      {
        name: 'Razer BlackWidow V3',
        description: 'The best keyboard in the world',
        price: 99.99,
        stock: 12,
        category: 'keyboard',
      },
      {
        name: 'Corsair K70',
        description: 'The best keyboard in the world',
        price: 79.99,
        stock: 12,
        category: 'keyboard',
      },
      {
        name: 'Logitech G Pro',
        description: 'The best keyboard in the world',
        price: 59.99,
        stock: 12,
        category: 'keyboard',
      },
      {
        name: 'Razer Viper',
        description: 'The best mouse in the world',
        price: 49.99,
        stock: 12,
        category: 'mouse',
      },
      {
        name: 'Logitech G502 Pro',
        description: 'The best mouse in the world',
        price: 39.99,
        stock: 12,
        category: 'mouse',
      },
      {
        name: 'SteelSeries Rival 3',
        description: 'The best mouse in the world',
        price: 29.99,
        stock: 12,
        category: 'mouse',
      },
    ];

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository,private readonly categoriesRepository: CategoriesRepository
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
    async addProducts(){
        const existingProducts = await this.productsRepository.getProducts(1,200);
        const categories = await this.categoriesRepository.getCategories();

        const newProducts = products.filter(product=>
            !existingProducts.some(
                existingProducts=>
                    existingProducts.name===product.name
            )
        ).map(product=>{
            const category = categories.find(
                category=>
                    category.name===product.category
            )
            if(!category)throw new Error(`Category "${product.category}" not found`)
            return {...product,category}
        })
        return this.productsRepository.addProducts(newProducts)
    }
}