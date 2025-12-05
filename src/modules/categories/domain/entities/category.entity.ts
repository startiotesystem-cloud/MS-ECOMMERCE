import { BaseEntity } from '../../../../common/base/base.entity';

export class CategoryEntity extends BaseEntity {
  name: string;
  slug?: string | null;
  description?: string | null;
  parentId?: string | null;

  // Relaciones del dominio
  parent?: CategoryEntity | null;
  children?: CategoryEntity[];
  products?: any[];

  constructor(props: Partial<CategoryEntity>) {
    super(props);
    Object.assign(this, props);
  }
}
