export class PaginationDto {
  page: number;
  limit: number;

  constructor(page?: number, limit?: number) {
    this.page = (page && page > 0) ? page : 1;
    this.limit = (limit && limit > 0) ? limit : 10;
  }

  getSkip(): number {
    return (this.page - 1) * this.limit;
  }
}
