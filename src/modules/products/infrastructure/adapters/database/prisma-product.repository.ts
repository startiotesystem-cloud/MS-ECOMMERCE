import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { PaginationDto } from '../../../application/dto/pagination.dto';
import { PaginatedResponse } from '../../../application/dto/paginated-response.dto';
import { ProductMapper } from './product.mapper';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination?: PaginationDto): Promise<ProductEntity[] | PaginatedResponse<ProductEntity>> {
    if (!pagination) {
      const data = await this.prisma.product.findMany({
        where: { deleted_at: null },
      });
      return data.map(ProductMapper.toDomain);
    }

    const total = await this.prisma.product.count({
      where: { deleted_at: null },
    });

    const data = await this.prisma.product.findMany({
      where: { deleted_at: null },
      skip: pagination.getSkip(),
      take: pagination.limit,
      orderBy: { created_at: 'desc' },
    });

    const mapped = data.map(ProductMapper.toDomain);
    
    // Retornamos un objeto plano con data al nivel superior
    return {
      data: mapped,
      total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(total / pagination.limit),
    } as any;
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const data = await this.prisma.product.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
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

  async softDelete(id: string | number): Promise<void> {
    await this.prisma.product.update({
      where: { id: String(id) },
      data: { deleted_at: new Date() },
    });
  }
}
