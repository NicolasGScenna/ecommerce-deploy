import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { FilesRepository } from "./files.repository";
import { CloudinaryConfig } from "src/config/cloudinary";
import { ProductsModule } from "../products/products.module";

@Module({
    imports:[ProductsModule],
    controllers:[FilesController],
    providers:[FilesService,FilesRepository,CloudinaryConfig],
})
export class FilesModule{}
