import { BrandEntity } from 'src/modules/brands/domain/entities/brand.entity';
import { Brand } from '@prisma/client';

export class BrandMapper {
  static toDomain(raw: Brand): BrandEntity {
    return new BrandEntity({
      id: raw.id,
      name: raw.name,
      slug: raw.slug,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      deletedAt: raw.deleted_at,
    });
  }

  static toPersistence(entity: BrandEntity): any {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
      deleted_at: entity.deletedAt,
    };
  }
}
