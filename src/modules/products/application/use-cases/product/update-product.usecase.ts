import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import { IProductRepository } from 'src/modules/products/domain/repositories/product.repository';


@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly repository: IProductRepository,
  ) {}

  async execute(id: string | number, data: Partial<ProductEntity>): Promise<ProductEntity> {
    return this.repository.update(id, data);
  }
}
