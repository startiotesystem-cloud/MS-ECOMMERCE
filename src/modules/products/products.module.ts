import { Module } from '@nestjs/common';
import { ProductsController } from './infrastructure/adapters/input/products.controller';
import { CreateProductUseCase } from './application/use-cases/create-product.usecase';
import { PrismaProductRepository } from './infrastructure/adapters/database/prisma-product.repository';
import { GetAllProductsUseCase } from './application/use-cases/get-all-products.usecase';
import { GetProductByIdUseCase } from './application/use-cases/get-product-by-id.usecase';
import { PrismaModule } from 'src/common/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [
    CreateProductUseCase,
    GetAllProductsUseCase,
    GetProductByIdUseCase,
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
  ],
})
export class ProductsModule {}
