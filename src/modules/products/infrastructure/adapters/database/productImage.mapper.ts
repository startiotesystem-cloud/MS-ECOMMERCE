import { ProductImage } from '@prisma/client';
import { ProductImageEntity } from '../../../domain/entities/producImage.entity';

export class ProductImageMapper {
  // Convierte del modelo de Prisma a la entidad de dominio
  static toDomain(raw: ProductImage): ProductImageEntity {
    return new ProductImageEntity({
      id: raw.id,
      url: raw.url,
      isMain: raw.is_main,
      alt: raw.alt ?? undefined,
      productId: raw.product_id ?? undefined,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
  }

  // Convierte de la entidad de dominio al formato que Prisma espera
  static toPersistence(entity: ProductImageEntity) {
    return {
      id: entity.id,
      url: entity.url,
      is_main: entity.isMain,
      alt: entity.alt ?? null,
      product_id: entity.productId ?? null,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    };
  }
}
