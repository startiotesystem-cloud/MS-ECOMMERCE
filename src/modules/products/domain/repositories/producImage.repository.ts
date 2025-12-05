import { ProductImageEntity } from "../entities/producImage.entity";
import { PaginationDto } from "../../application/dto/pagination.dto";
import { PaginatedResponse } from "../../application/dto/paginated-response.dto";

export abstract class IProductImageRepository {
  abstract findAll(pagination?: PaginationDto): Promise<ProductImageEntity[] | PaginatedResponse<ProductImageEntity>>;
  abstract findById(id: string | number): Promise<ProductImageEntity | null>;
  abstract create(data: Partial<ProductImageEntity>): Promise<ProductImageEntity>;
  abstract update(id: string | number, data: Partial<ProductImageEntity>): Promise<ProductImageEntity>;
  abstract delete(id: string | number): Promise<void>;
  abstract softDelete(id: string | number): Promise<void>;
}
