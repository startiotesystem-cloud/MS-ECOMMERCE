import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import { IProductRepository } from 'src/modules/products/domain/repositories/product.repository';


@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly repository: IProductRepository,
  ) {}

  async execute(data: Partial<ProductEntity>): Promise<ProductEntity> {
    const product = new ProductEntity(data);
    return this.repository.create(product);
  }
}
