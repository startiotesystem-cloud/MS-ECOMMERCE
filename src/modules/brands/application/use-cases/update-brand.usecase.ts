import { Injectable } from '@nestjs/common';
import { IBrandRepository } from 'src/modules/brands/domain/repositories/brand.repository';
import { BrandEntity } from 'src/modules/brands/domain/entities/brand.entity';

@Injectable()
export class UpdateBrandUseCase {
  constructor(
    private readonly repository: IBrandRepository,
  ) {}

  async execute(id: string, data: Partial<BrandEntity>): Promise<BrandEntity> {
    return this.repository.update(id, data);
  }
}
