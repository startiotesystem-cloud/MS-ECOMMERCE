import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateProductImageDTO } from "src/modules/products/application/dto/create-producImage.dto";
import { CreateProductImageUseCase } from "src/modules/products/application/use-cases/produc-image/create-producImage.usecase";

@Controller('products-images')
export class ProductsImagesController {
    constructor(
        private readonly createProducImage: CreateProductImageUseCase
    ) { }

   @Post()
@UseInterceptors(FileInterceptor('file'))
create(
  @UploadedFile() file: Express.Multer.File,
  @Body() body: any
) {
  console.log("RAW BODY =>", body);

  return this.createProducImage.execute({
    file,
    alt: body.alt,
    is_main: body.is_main === 'true',   // convertir string a boolean
    productId: body.product_id          // mapear snake_case → camelCase
  });
}





}