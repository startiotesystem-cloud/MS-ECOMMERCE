import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/modules/categories/domain/repositories/category.repository';


@Injectable()
export class GetCategoryByIdUseCase {
  constructor(
    private readonly repository: ICategoryRepository,
  ) {}

  execute(id: string) {
    return this.repository.findById(id);
  }
}
