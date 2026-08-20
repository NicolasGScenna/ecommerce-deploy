import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { Category } from "src/entities/cateogry.entity";

@Injectable()
export class CategoriesService{
    constructor(private readonly categoriesRepository: CategoriesRepository){}

    async getCategories(){
        return this.categoriesRepository.getCategories()
    }
    async addCategories(categories: { name: string }[]){
        const existingCategories = await this.categoriesRepository.getCategories()
        const newCategories = categories.filter(category=>!existingCategories.some(existingCategories=>existingCategories.name===category.name));
        if(newCategories.length===0)return existingCategories;
        return this.categoriesRepository.addCategories(newCategories)
    }
}