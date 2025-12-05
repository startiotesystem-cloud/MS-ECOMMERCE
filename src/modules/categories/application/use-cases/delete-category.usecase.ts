import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/modules/categories/domain/repositories/category.repository';


@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    private readonly repository: ICategoryRepository,
  ) {}

  async execute(id: string | number): Promise<void> {
    return this.repository.softDelete(id);
  }
}
