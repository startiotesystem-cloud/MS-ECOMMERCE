import { Inject, Injectable } from '@nestjs/common';
import { IProductImageRepository } from 'src/modules/products/domain/repositories/producImage.repository';


@Injectable()
export class GetAllProductImagesUseCase {
  constructor(
    @Inject('IProductImageRepository')
    private readonly repository: IProductImageRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
