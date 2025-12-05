import { CategoryEntity } from '../entities/category.entity';
import { PaginationDto } from 'src/modules/products/application/dto/pagination.dto';

export abstract class ICategoryRepository {
  abstract findAll(pagination?: PaginationDto): Promise<CategoryEntity[] | any>;
  abstract findById(id: string | number): Promise<CategoryEntity | null>;
  abstract create(data: Partial<CategoryEntity>): Promise<CategoryEntity>;
  abstract update(id: string | number, data: Partial<CategoryEntity>): Promise<CategoryEntity>;
  abstract delete(id: string | number): Promise<void>;
  abstract softDelete(id: string | number): Promise<void>;
}
