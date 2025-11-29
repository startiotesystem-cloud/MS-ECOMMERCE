import { Transform } from "class-transformer";

export class CreateProductImageDTO {

  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  is_main: boolean;

  alt: string;
  product_id: string;
}
