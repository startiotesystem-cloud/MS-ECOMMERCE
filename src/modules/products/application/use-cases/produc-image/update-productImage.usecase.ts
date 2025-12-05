import { Inject, Injectable } from '@nestjs/common';
import { ProductImageEntity } from 'src/modules/products/domain/entities/producImage.entity';
import { IProductImageRepository } from 'src/modules/products/domain/repositories/producImage.repository';


@Injectable()
export class UpdateProductImageUseCase {
  constructor(
    @Inject('IProductImageRepository')
    private readonly repository: IProductImageRepository,
  ) {}

  async execute(id: string | number, data: Partial<ProductImageEntity>): Promise<ProductImageEntity> {
    return this.repository.update(id, data);
  }
}
