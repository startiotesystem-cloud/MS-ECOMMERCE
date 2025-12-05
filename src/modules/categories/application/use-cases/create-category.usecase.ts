import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/modules/categories/domain/entities/category.entity';
import { ICategoryRepository } from 'src/modules/categories/domain/repositories/category.repository';


@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly repository: ICategoryRepository,
  ) {}

  async execute(data: Partial<CategoryEntity>): Promise<CategoryEntity> {
    const category = new CategoryEntity(data);
    return this.repository.create(category);
  }
}
