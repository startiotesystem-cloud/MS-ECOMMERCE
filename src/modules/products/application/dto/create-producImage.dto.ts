import { ProductEntity } from "../../domain/entities/product.entity";

export class createProductImageDTO {

    url: string;
    is_main: boolean;
    alt: string;
    productId: string;

}