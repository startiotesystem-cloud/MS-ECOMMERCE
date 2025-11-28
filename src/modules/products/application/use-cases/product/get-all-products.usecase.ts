import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/modules/products/domain/repositories/product.repository';



@Injectable()
export class GetAllProductsUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly repository: IProductRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
