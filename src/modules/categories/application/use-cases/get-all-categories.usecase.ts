import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/modules/categories/domain/repositories/category.repository';
import { PaginationDto } from 'src/modules/products/application/dto/pagination.dto';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(
    private readonly repository: ICategoryRepository,
  ) {}

  execute(pagination?: PaginationDto | undefined) {
    return this.repository.findAll(pagination);
  }
}
