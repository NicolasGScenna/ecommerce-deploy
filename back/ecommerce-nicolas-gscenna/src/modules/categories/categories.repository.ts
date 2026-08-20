import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/cateogry.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository {
    constructor(@InjectRepository(Category)private readonly categoriesRepository:Repository<Category>){}

    async getCategories():Promise<Category[]>{
        return this.categoriesRepository.find()
    }
    async addCategories(categories: { name: string }[]): Promise <Category[]>{
        return this.categoriesRepository.save(categories)
    }
}