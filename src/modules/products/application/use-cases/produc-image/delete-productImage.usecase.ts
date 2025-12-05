import { Inject, Injectable } from '@nestjs/common';
import { IProductImageRepository } from 'src/modules/products/domain/repositories/producImage.repository';


@Injectable()
export class DeleteProductImageUseCase {
  constructor(
    @Inject('IProductImageRepository')
    private readonly repository: IProductImageRepository,
  ) {}

  async execute(id: string | number): Promise<void> {
    return this.repository.softDelete(id);
  }
}
