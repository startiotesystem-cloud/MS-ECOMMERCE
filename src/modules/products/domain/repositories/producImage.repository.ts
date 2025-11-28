import { ProductImageEntity } from "../entities/producImage.entity"; 

export abstract class IProductImageRepository {
  abstract findAll(): Promise<ProductImageEntity[]>;
  abstract findById(id: string | number): Promise<ProductImageEntity | null>;
  abstract create(data: Partial<ProductImageEntity>): Promise<ProductImageEntity>;
  abstract update(id: string | number, data: Partial<ProductImageEntity>): Promise<ProductImageEntity>;
  abstract delete(id: string | number): Promise<void>;
}
