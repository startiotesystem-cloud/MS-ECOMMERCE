import { Inject, Injectable } from '@nestjs/common';
import { ProductImageEntity } from 'src/modules/products/domain/entities/producImage.entity';
import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import { IProductImageRepository } from 'src/modules/products/domain/repositories/producImage.repository';



@Injectable()
export class CreateProductImageUseCase {
  constructor(
    @Inject('IProductImageRepository')
    private readonly repository: IProductImageRepository,
  ) {}

  async execute(data: Partial<ProductImageEntity>): Promise<ProductImageEntity> {
    const product = new ProductEntity(data);
    return this.repository.create(product);
  }
}
