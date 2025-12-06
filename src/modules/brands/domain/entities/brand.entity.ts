import { BaseEntity } from '../../../../common/base/base.entity';

export class BrandEntity extends BaseEntity {
  name: string;
  slug?: string | null;

  // Relaciones del dominio
  products?: any[];

  constructor(props: Partial<BrandEntity>) {
    super(props);
    Object.assign(this, props);
  }
}
