import { BrandEntity } from '../entities/brand.entity';
import { PaginationDto } from 'src/modules/products/application/dto/pagination.dto';

export abstract class IBrandRepository {
  abstract findAll(pagination?: PaginationDto): Promise<BrandEntity[] | any>;
  abstract findById(id: string | number): Promise<BrandEntity | null>;
  abstract create(data: Partial<BrandEntity>): Promise<BrandEntity>;
  abstract update(id: string | number, data: Partial<BrandEntity>): Promise<BrandEntity>;
  abstract delete(id: string | number): Promise<void>;
}
