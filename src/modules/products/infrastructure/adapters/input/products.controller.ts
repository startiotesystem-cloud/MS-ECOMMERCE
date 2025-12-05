import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto } from '../../../application/dto/create-product.dto';
import { PaginationDto } from '../../../application/dto/pagination.dto';
import { CreateProductUseCase } from 'src/modules/products/application/use-cases/product/create-product.usecase';
import { GetAllProductsUseCase } from 'src/modules/products/application/use-cases/product/get-all-products.usecase';
import { GetProductByIdUseCase } from 'src/modules/products/application/use-cases/product/get-product-by-id.usecase';
import { UpdateProductUseCase } from 'src/modules/products/application/use-cases/product/update-product.usecase';
import { DeleteProductUseCase } from 'src/modules/products/application/use-cases/product/delete-product.usecase';


@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly getAllProducts: GetAllProductsUseCase,
    private readonly getProductById: GetProductByIdUseCase,
    private readonly updateProduct: UpdateProductUseCase,
    private readonly deleteProduct: DeleteProductUseCase,
  ) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    
    return this.createProduct.execute(body);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pagination = new PaginationDto(
      page ? parseInt(page) : undefined,
      limit ? parseInt(limit) : undefined,
    );
    return this.getAllProducts.execute(pagination);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getProductById.execute(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateProductDto) {
    return this.updateProduct.execute(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteProduct.execute(id);
  }
}
