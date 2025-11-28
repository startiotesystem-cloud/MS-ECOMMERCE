import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/modules/products/domain/repositories/product.repository';


@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly repository: IProductRepository,
  ) {}

  execute(id: string) {
    return this.repository.findById(id);
  }
}
