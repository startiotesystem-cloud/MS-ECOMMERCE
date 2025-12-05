import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/modules/products/domain/repositories/product.repository';
import { PaginationDto } from '../../dto/pagination.dto';



@Injectable()
export class GetAllProductsUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly repository: IProductRepository,
  ) {}

  execute(pagination?: PaginationDto | undefined) {
    return this.repository.findAll(pagination);
  }
}
