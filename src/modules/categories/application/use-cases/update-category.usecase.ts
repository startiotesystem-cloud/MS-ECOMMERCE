import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/modules/categories/domain/entities/category.entity';
import { ICategoryRepository } from 'src/modules/categories/domain/repositories/category.repository';


@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private readonly repository: ICategoryRepository,
  ) {}

  async execute(id: string | number, data: Partial<CategoryEntity>): Promise<CategoryEntity> {
    return this.repository.update(id, data);
  }
}
