import { Injectable } from '@nestjs/common';
import { IBrandRepository } from 'src/modules/brands/domain/repositories/brand.repository';
import { PaginationDto } from 'src/modules/products/application/dto/pagination.dto';

@Injectable()
export class GetAllBrandsUseCase {
  constructor(
    private readonly repository: IBrandRepository,
  ) {}

  async execute(pagination?: PaginationDto) {
    return this.repository.findAll(pagination);
  }
}
