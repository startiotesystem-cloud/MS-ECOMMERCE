import { ProductEntity } from "../entities/product.entity";
import { PaginationDto } from "../../application/dto/pagination.dto";
import { PaginatedResponse } from "../../application/dto/paginated-response.dto";

export abstract class IProductRepository {
  abstract findAll(pagination?: PaginationDto): Promise<ProductEntity[] | PaginatedResponse<ProductEntity>>;
  abstract findById(id: string | number): Promise<ProductEntity | null>;
  abstract create(data: Partial<ProductEntity>): Promise<ProductEntity>;
  abstract update(id: string | number, data: Partial<ProductEntity>): Promise<ProductEntity>;
  abstract delete(id: string | number): Promise<void>;
  abstract softDelete(id: string | number): Promise<void>;
}
