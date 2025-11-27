import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductMapper } from './product.mapper';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProductEntity[]> {
    const data = await this.prisma.product.findMany();
    return data.map(ProductMapper.toDomain);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const data = await this.prisma.product.findUnique({ where: { id } });
    return data ? ProductMapper.toDomain(data) : null;
  }

  async create(entity: ProductEntity): Promise<ProductEntity> {
    const raw = ProductMapper.toPersistence(entity);

    const data = await this.prisma.product.create({
      data: raw,
    });

    return ProductMapper.toDomain(data);
  }

  async update(id: string, partial: Partial<ProductEntity>): Promise<ProductEntity> {
    const raw = ProductMapper.toPersistence(partial as ProductEntity);

    const data = await this.prisma.product.update({
      where: { id },
      data: raw,
    });

    return ProductMapper.toDomain(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
