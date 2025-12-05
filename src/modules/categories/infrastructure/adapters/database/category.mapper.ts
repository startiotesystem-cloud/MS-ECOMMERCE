import { Category } from '@prisma/client';
import { CategoryEntity } from '../../../domain/entities/category.entity';

export class CategoryMapper {
  static toDomain(raw: Category): CategoryEntity {
    return new CategoryEntity({
      id: raw.id,
      name: raw.name,
      slug: raw.slug ?? undefined,
      description: raw.description ?? undefined,
      parentId: raw.parent_id ?? undefined,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      deletedAt: raw.deleted_at ?? undefined,
    });
  }

  static toPersistence(entity: Partial<CategoryEntity>) {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug ?? null,
      description: entity.description ?? null,
      parent_id: entity.parentId ?? null,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
      deleted_at: entity.deletedAt ?? null,
    };
  }
}
