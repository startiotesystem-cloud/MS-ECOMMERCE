import { Inject, Injectable } from '@nestjs/common';
import { ProductImageEntity } from 'src/modules/products/domain/entities/producImage.entity';
import { IProductImageRepository } from 'src/modules/products/domain/repositories/producImage.repository';
import { IStorageService } from 'src/modules/products/domain/repositories/services/storage.sevice';



@Injectable()
export class CreateProductImageUseCase {
  constructor(
    @Inject('IProductImageRepository')
    private readonly repository: IProductImageRepository,

    @Inject('IStorageService')
    private readonly storage: IStorageService,
  ) {}

  async execute(data: any): Promise<ProductImageEntity> {
    const { file, is_main, alt, productId } = data;

    // 1. Subida a MinIO
    const fileName = `products/${Date.now()}-${file.originalname}`;
    const url = await this.storage.upload(file.buffer, fileName, file.mimetype);

    // 2. Crear entidad de dominio
    const productImage = new ProductImageEntity({
      url,
      isMain: is_main,
      alt,
      productId
    });

    // 3. Guardar en BD
    return this.repository.create(productImage);
  }
}
