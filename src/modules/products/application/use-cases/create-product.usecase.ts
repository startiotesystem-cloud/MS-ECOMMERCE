import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';

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
