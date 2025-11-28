import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { createProductImageDTO } from "src/modules/products/application/dto/create-producImage.dto";
import { CreateProductImageUseCase } from "src/modules/products/application/use-cases/produc-image/create-producImage.usecase";

@Controller('products-images')
export class ProductsImagesController {
    constructor(
        private readonly createProducImage: CreateProductImageUseCase
    ){}

    @Post()
    create (@Body() body: createProductImageDTO){

        return this.createProducImage.execute(body);
    }

}