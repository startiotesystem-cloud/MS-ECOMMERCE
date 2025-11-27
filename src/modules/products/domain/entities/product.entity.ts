// src/modules/products/domain/entities/product.entity.ts

import { BaseEntity } from '../../../../common/base/base.entity';

export class ProductEntity extends BaseEntity {
  name: string;
  barCode?: string | null;
  purchasePrice: number;
  salePrice: number;
  tax?: string | null;
  reference?: string | null;
  description?: string | null;
  slug?: string | null;
  status?: string | null;
  brandId?: string | null;

  // Relaciones del dominio (no ORM)
  brand?: any | null;
  images?: any[];
  skus?: any[];
  categories?: any[];
  cartItems?: any[];
  orderItems?: any[];

  constructor(props: Partial<ProductEntity>) {
    super(props);
    Object.assign(this, props);
  }
}
