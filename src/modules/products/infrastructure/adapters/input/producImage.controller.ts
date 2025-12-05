import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateProductImageDTO } from "src/modules/products/application/dto/create-producImage.dto";
import { PaginationDto } from "src/modules/products/application/dto/pagination.dto";
import { CreateProductImageUseCase } from "src/modules/products/application/use-cases/produc-image/create-producImage.usecase";
import { UpdateProductImageUseCase } from "src/modules/products/application/use-cases/produc-image/update-productImage.usecase";
import { DeleteProductImageUseCase } from "src/modules/products/application/use-cases/produc-image/delete-productImage.usecase";
import { GetAllProductImagesUseCase } from "src/modules/products/application/use-cases/produc-image/get-productImages.use";
import { GetProductImageByIdUseCase } from "src/modules/products/application/use-cases/produc-image/get-productImage.use";

@Controller('products-images')
export class ProductsImagesController {
    constructor(
        private readonly createProducImage: CreateProductImageUseCase,
        private readonly updateProducImage: UpdateProductImageUseCase,
        private readonly deleteProducImage: DeleteProductImageUseCase,
        private readonly getAllProducImages: GetAllProductImagesUseCase,
        private readonly getProducImageById: GetProductImageByIdUseCase,
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

@Get()
async findAll(
  @Query('page') page?: string,
  @Query('limit') limit?: string,
) {
  // Solo usar paginación si se proporciona al menos un parámetro
  if (page || limit) {
    const pagination = new PaginationDto(
      page ? parseInt(page) : undefined,
      limit ? parseInt(limit) : undefined,
    );
    return this.getAllProducImages.execute(pagination);
  }

  // Sin paginación, retornar todas las imágenes
  return this.getAllProducImages.execute();
}

@Get(':id')
findById(@Param('id') id: string) {
  return this.getProducImageById.execute(id);
}

@Put(':id')
@UseInterceptors(FileInterceptor('file'))
update(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File | undefined,
  @Body() body: any
) {
  const updateData: any = {
    alt: body.alt,
    isMain: body.is_main === 'true',
    productId: body.product_id
  };
  
  if (file) {
    updateData.file = file;
  }
  
  return this.updateProducImage.execute(id, updateData);
}

@Delete(':id')
delete(@Param('id') id: string) {
  return this.deleteProducImage.execute(id);
}





}