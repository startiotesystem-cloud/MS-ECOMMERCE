// src/modules/products/infrastructure/adapters/database/prisma-product.repository.ts
// EJEMPLO DE IMPLEMENTACIÓN CON SOFT DELETE Y PAGINACIÓN

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import { IProductRepository } from 'src/modules/products/domain/repositories/product.repository';
import { PaginationDto } from 'src/modules/products/application/dto/pagination.dto';
import { PaginatedResponse } from 'src/modules/products/application/dto/paginated-response.dto';
import { ProductMapper } from './product.mapper';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(pagination?: PaginationDto) {
    if (!pagination) {
      const products = await this.prisma.product.findMany({
        where: { deleted_at: null },
      });
      return products.map(p => ProductMapper.toDomain(p));
    }

    const total = await this.prisma.product.count({
      where: { deleted_at: null },
    });

    const products = await this.prisma.product.findMany({
      where: { deleted_at: null },
      skip: pagination.getSkip(),
      take: pagination.limit,
      orderBy: { created_at: 'desc' },
    });

    return new PaginatedResponse(
      products.map(p => ProductMapper.toDomain(p)),
      total,
      pagination.page,
      pagination.limit,
    );
  }

  async findById(id: string | number): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        id: String(id),
        deleted_at: null,
      },
    });
    return product ? ProductMapper.toDomain(product) : null;
  }

  async create(data: Partial<ProductEntity>): Promise<ProductEntity> {
    const product = await this.prisma.product.create({
      data: ProductMapper.toPersistence(data),
    });
    return ProductMapper.toDomain(product);
  }

  async update(id: string | number, data: Partial<ProductEntity>): Promise<ProductEntity> {
    const product = await this.prisma.product.update({
      where: { id: String(id) },
      data: ProductMapper.toPersistence(data),
    });
    return ProductMapper.toDomain(product);
  }

  async delete(id: string | number): Promise<void> {
    await this.prisma.product.delete({
      where: { id: String(id) },
    });
  }

  async softDelete(id: string | number): Promise<void> {
    await this.prisma.product.update({
      where: { id: String(id) },
      data: { deleted_at: new Date() },
    });
  }
}
