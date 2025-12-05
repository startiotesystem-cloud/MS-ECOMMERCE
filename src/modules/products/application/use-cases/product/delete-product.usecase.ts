import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/modules/products/domain/repositories/product.repository';


@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly repository: IProductRepository,
  ) {}

  async execute(id: string | number): Promise<void> {
    return this.repository.delete(id);
  }
}
