import { Product } from '@prisma/client';
import { ProductEntity } from '../../../domain/entities/product.entity';

export class ProductMapper {
// Convierte del modelo de Prisma a la entidad de dominio
static toDomain(raw: Product): ProductEntity {
return new ProductEntity({
id: raw.id,
name: raw.name,
barCode: raw.bar_code ?? undefined,
purchasePrice: raw.purchase_price,
salePrice: raw.sale_price,
tax: raw.tax ?? undefined,
reference: raw.reference ?? undefined,
description: raw.description ?? undefined,
slug: raw.slug ?? undefined,
status: raw.status ?? undefined,
brandId: raw.brand_id ?? undefined,
createdAt: raw.created_at,
updatedAt: raw.updated_at,
});
}

// Convierte de la entidad de dominio al formato que Prisma espera
static toPersistence(entity: ProductEntity) {
return {
id: entity.id,
name: entity.name,
bar_code: entity.barCode ?? null,
purchase_price: entity.purchasePrice,
sale_price: entity.salePrice,
tax: entity.tax ?? null,
reference: entity.reference ?? null,
description: entity.description ?? null,
slug: entity.slug ?? null,
status: entity.status ?? null,
brand_id: entity.brandId ?? null,
created_at: entity.createdAt,
updated_at: entity.updatedAt,
};
}
}
