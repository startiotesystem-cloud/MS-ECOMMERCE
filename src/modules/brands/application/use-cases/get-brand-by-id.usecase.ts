import { Injectable } from '@nestjs/common';
import { IBrandRepository } from 'src/modules/brands/domain/repositories/brand.repository';

@Injectable()
export class GetBrandByIdUseCase {
  constructor(
    private readonly repository: IBrandRepository,
  ) {}

  async execute(id: string) {
    return this.repository.findById(id);
  }
}
