import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/database/prisma.module';
import { CategoriesController } from './infrastructure/adapters/input/categories.controller';
import { PrismaCategoryRepository } from './infrastructure/adapters/database/prisma-category.repository';
import { ICategoryRepository } from './domain/repositories/category.repository';
import { CreateCategoryUseCase } from './application/use-cases/create-category.usecase';
import { GetAllCategoriesUseCase } from './application/use-cases/get-all-categories.usecase';
import { GetCategoryByIdUseCase } from './application/use-cases/get-category-by-id.usecase';
import { UpdateCategoryUseCase } from './application/use-cases/update-category.usecase';
import { DeleteCategoryUseCase } from './application/use-cases/delete-category.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [
    {
      provide: ICategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
  exports: [ICategoryRepository],
})
export class CategoriesModule {}
