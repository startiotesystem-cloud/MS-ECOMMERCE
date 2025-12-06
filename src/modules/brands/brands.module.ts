import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/database/prisma.module';
import { BrandsController } from './infrastructure/adapters/input/brands.controller';
import { PrismaBrandRepository } from './infrastructure/adapters/database/prisma-brand.repository';
import { IBrandRepository } from './domain/repositories/brand.repository';
import { CreateBrandUseCase } from './application/use-cases/create-brand.usecase';
import { GetAllBrandsUseCase } from './application/use-cases/get-all-brands.usecase';
import { GetBrandByIdUseCase } from './application/use-cases/get-brand-by-id.usecase';
import { UpdateBrandUseCase } from './application/use-cases/update-brand.usecase';
import { DeleteBrandUseCase } from './application/use-cases/delete-brand.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [BrandsController],
  providers: [
    {
      provide: IBrandRepository,
      useClass: PrismaBrandRepository,
    },
    CreateBrandUseCase,
    GetAllBrandsUseCase,
    GetBrandByIdUseCase,
    UpdateBrandUseCase,
    DeleteBrandUseCase,
  ],
  exports: [IBrandRepository],
})
export class BrandsModule {}
