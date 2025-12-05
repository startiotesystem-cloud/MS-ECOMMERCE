export class UpdateCategoryDto {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string | null;
}
