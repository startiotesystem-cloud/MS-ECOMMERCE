import { Module } from '@nestjs/common';
import { ProductsController } from './infrastructure/adapters/input/products.controller';
import { PrismaModule } from 'src/common/database/prisma.module';
import { CreateProductUseCase } from './application/use-cases/product/create-product.usecase';
import { GetAllProductsUseCase } from './application/use-cases/product/get-all-products.usecase';
import { GetProductByIdUseCase } from './application/use-cases/product/get-product-by-id.usecase';
import { UpdateProductUseCase } from './application/use-cases/product/update-product.usecase';
import { DeleteProductUseCase } from './application/use-cases/product/delete-product.usecase';
import { PrismaProductRepository } from './infrastructure/adapters/database/prisma-product.repository';
import { ProductsImagesController } from './infrastructure/adapters/input/producImage.controller';
import { CreateProductImageUseCase } from './application/use-cases/produc-image/create-producImage.usecase';
import { UpdateProductImageUseCase } from './application/use-cases/produc-image/update-productImage.usecase';
import { DeleteProductImageUseCase } from './application/use-cases/produc-image/delete-productImage.usecase';
import { GetAllProductImagesUseCase } from './application/use-cases/produc-image/get-productImages.use';
import { GetProductImageByIdUseCase } from './application/use-cases/produc-image/get-productImage.use';
import { PrismaProductImageRepository } from './infrastructure/adapters/database/prisma-productImage-repository';
import { MinioStorageService } from './infrastructure/storage/services/minio-storage.service';


@Module({
  imports: [PrismaModule],
  controllers: [ProductsController, ProductsImagesController],
  providers: [
    CreateProductUseCase,
    GetAllProductsUseCase,
    GetProductByIdUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    CreateProductImageUseCase,
    UpdateProductImageUseCase,
    DeleteProductImageUseCase,
    GetAllProductImagesUseCase,
    GetProductImageByIdUseCase,
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
