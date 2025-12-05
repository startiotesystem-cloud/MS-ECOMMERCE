import { Inject, Injectable } from '@nestjs/common';
import { IProductImageRepository } from 'src/modules/products/domain/repositories/producImage.repository';
import { PaginationDto } from '../../dto/pagination.dto';


@Injectable()
export class GetAllProductImagesUseCase {
  constructor(
    @Inject('IProductImageRepository')
    private readonly repository: IProductImageRepository,
  ) {}

  execute(pagination?: PaginationDto | undefined) {
    return this.repository.findAll(pagination);
  }
}
