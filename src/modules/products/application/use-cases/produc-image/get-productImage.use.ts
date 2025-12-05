import { Inject, Injectable } from '@nestjs/common';
import { IProductImageRepository } from 'src/modules/products/domain/repositories/producImage.repository';


@Injectable()
export class GetProductImageByIdUseCase {
  constructor(
    @Inject('IProductImageRepository')
    private readonly repository: IProductImageRepository,
  ) {}

  execute(id: string | number) {
    return this.repository.findById(id);
  }
}
