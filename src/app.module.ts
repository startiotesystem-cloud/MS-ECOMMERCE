import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BrandsModule } from './modules/brands/brands.module';

@Module({
  imports: [ProductsModule, CategoriesModule, BrandsModule],
})
export class AppModule {}
