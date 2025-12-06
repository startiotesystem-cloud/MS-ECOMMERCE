import { Injectable } from '@nestjs/common';
import { IBrandRepository } from 'src/modules/brands/domain/repositories/brand.repository';

@Injectable()
export class DeleteBrandUseCase {
  constructor(
    private readonly repository: IBrandRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
