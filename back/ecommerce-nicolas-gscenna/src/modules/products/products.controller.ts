import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    UseGuards,

} from "@nestjs/common";

import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { AuthGuard } from "../auth/auth.guard";
import { IdParamDto } from "../../dto/id-param.dto";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../../decorators/roles.decorator";
import { Role } from "../auth/roles.enum";

@Controller('products')
export class ProductsController {

    constructor(
        private readonly productsService: ProductsService,
    ) {}

    @Get()
    getProducts(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '5',
    ) {
        return this.productsService.getProducts(
            Number(page),
            Number(limit),
        );
    }

    @Get(':id')
    async getProductById(
        @Param() params: IdParamDto,
    ) {
        const product = await this.productsService.getProductById(params.id)
        if(!product) throw new NotFoundException ('Producto no encontrado')
        return product;
    }

    @Post()
    @UseGuards(AuthGuard)
    createProduct(
        @Body() product: CreateProductDto,
    ) {
        return this.productsService.createProduct(product);
    }

    @Post('seeder')
    addProducts() {
        return this.productsService.addProducts();
    }

    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    async updateProduct(
        @Param() params: IdParamDto,
        @Body() product: CreateProductDto,
    ) {
        const productToUpdate = await this.productsService.getProductById(params.id)
        if(!productToUpdate) throw new NotFoundException ('Producto no encontrado')
        return this.productsService.updateProduct(
            params.id,
            product,
        );
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteProduct(
        @Param() params: IdParamDto,
    ) {
        const product = await this.productsService.getProductById(params.id)
        if(!product) throw new NotFoundException ('Producto no encontrado')
        return this.productsService.deleteProduct(params.id);
    }
}