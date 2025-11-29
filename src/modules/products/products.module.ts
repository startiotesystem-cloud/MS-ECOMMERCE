import { Module } from '@nestjs/common';
import { ProductsController } from './infrastructure/adapters/input/products.controller';
import { PrismaModule } from 'src/common/database/prisma.module';
import { CreateProductUseCase } from './application/use-cases/product/create-product.usecase';
import { GetAllProductsUseCase } from './application/use-cases/product/get-all-products.usecase';
import { GetProductByIdUseCase } from './application/use-cases/product/get-product-by-id.usecase';
import { PrismaProductRepository } from './infrastructure/adapters/database/prisma-product.repository';
import { ProductsImagesController } from './infrastructure/adapters/input/producImage.controller';
import { CreateProductImageUseCase } from './application/use-cases/produc-image/create-producImage.usecase';
import { PrismaProductImageRepository } from './infrastructure/adapters/database/prisma-productImage-repository';
import { MinioStorageService } from './infrastructure/storage/services/minio-storage.service';


@Module({
  imports: [PrismaModule],
  controllers: [ProductsController, ProductsImagesController],
  providers: [
    CreateProductUseCase,
    GetAllProductsUseCase,
    GetProductByIdUseCase,
    CreateProductImageUseCase,
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: 'IProductImageRepository',
      useClass: PrismaProductImageRepository,
    },
    {
  provide: 'IStorageService',
  useClass: MinioStorageService,
}
  ],
})
export class ProductsModule {}
