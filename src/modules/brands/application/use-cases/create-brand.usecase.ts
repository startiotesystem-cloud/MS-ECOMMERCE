import { Injectable } from '@nestjs/common';
import { BrandEntity } from 'src/modules/brands/domain/entities/brand.entity';
import { IBrandRepository } from 'src/modules/brands/domain/repositories/brand.repository';

@Injectable()
export class CreateBrandUseCase {
  constructor(
    private readonly repository: IBrandRepository,
  ) {}

  async execute(data: Partial<BrandEntity>): Promise<BrandEntity> {
    const brand = new BrandEntity(data);
    return this.repository.create(brand);
  }
}
