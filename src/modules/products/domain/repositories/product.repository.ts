import { ProductEntity } from "../entities/product.entity";

export abstract class IProductRepository {
  abstract findAll(): Promise<ProductEntity[]>;
  abstract findById(id: string | number): Promise<ProductEntity | null>;
  abstract create(data: Partial<ProductEntity>): Promise<ProductEntity>;
  abstract update(id: string | number, data: Partial<ProductEntity>): Promise<ProductEntity>;
  abstract delete(id: string | number): Promise<void>;
}
