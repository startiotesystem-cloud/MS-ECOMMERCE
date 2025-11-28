export class CreateProductDto {
  name: string;
  purchasePrice: number;
  salePrice: number;
  barCode?: string;
  tax?: number;
  reference?: string;
  description?: string;
  slug?: string;
  status?: string;
  brandId?: string;
}
