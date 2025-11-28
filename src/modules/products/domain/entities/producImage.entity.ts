import { BaseEntity } from "src/common/base/base.entity";

export class ProductImageEntity extends BaseEntity {
    url: string;
    isMain: boolean;
    alt: string;

    // Este debe ser un simple string, porque representa el ID del producto
    productId: string;

    constructor(props: Partial<ProductImageEntity>) {
        super(props);
        Object.assign(this, props);
    }
}
