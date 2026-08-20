import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/cateogry.entity";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { CategoriesRepository } from "./categories.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Category])],
    controllers:[CategoriesController],
    providers:[CategoriesService,CategoriesRepository],
    exports:[CategoriesRepository],
})
export class CategoriesModules{}
