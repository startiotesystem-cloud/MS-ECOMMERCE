import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from '../../../application/dto/create-product.dto';
import { CreateProductUseCase } from 'src/modules/products/application/use-cases/product/create-product.usecase';
import { GetAllProductsUseCase } from 'src/modules/products/application/use-cases/product/get-all-products.usecase';
import { GetProductByIdUseCase } from 'src/modules/products/application/use-cases/product/get-product-by-id.usecase';


@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly getAllProducts: GetAllProductsUseCase,
    private readonly getProductById: GetProductByIdUseCase,
  ) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    
    return this.createProduct.execute(body);
  }

  @Get()
  findAll() {
    return this.getAllProducts.execute();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getProductById.execute(id);
  }
}
