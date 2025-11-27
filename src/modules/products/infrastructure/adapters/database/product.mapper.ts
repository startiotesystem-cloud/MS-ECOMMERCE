import { Product } from '@prisma/client';
import { ProductEntity } from '../../../domain/entities/product.entity';

export class ProductMapper {
  static toDomain(raw: Product): ProductEntity {
    return new ProductEntity({
      id: raw.id,
      name: raw.name,
      barCode: raw.bar_code,
      purchasePrice: raw.purchase_price,
      salePrice: raw.sale_price,
      tax: raw.tax,
      reference: raw.reference,
      description: raw.description,
      slug: raw.slug,
      status: raw.status,
      brandId: raw.brand_id,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
  }

  static toPersistence(entity: ProductEntity) {
    return {
      id: entity.id,
      name: entity.name,
      bar_code: entity.barCode,
      purchase_price: entity.purchasePrice,
      sale_price: entity.salePrice,
      tax: entity.tax,
      reference: entity.reference,
      description: entity.description,
      slug: entity.slug,
      status: entity.status,
      brand_id: entity.brandId,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    };
  }
}
