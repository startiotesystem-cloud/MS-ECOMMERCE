import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { IBrandRepository } from 'src/modules/brands/domain/repositories/brand.repository';
import { BrandEntity } from 'src/modules/brands/domain/entities/brand.entity';
import { PaginationDto } from 'src/modules/products/application/dto/pagination.dto';
import { BrandMapper } from './brand.mapper';

@Injectable()
export class PrismaBrandRepository implements IBrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination?: PaginationDto): Promise<BrandEntity[] | any> {
    if (!pagination) {
      const data = await this.prisma.brand.findMany();
      return data.map(BrandMapper.toDomain);
    }

    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const skip = (page - 1) * limit;

    const total = await this.prisma.brand.count();

    const data = await this.prisma.brand.findMany({
      skip,
      take: limit,
    });

    return {
      data: data.map(BrandMapper.toDomain),
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<BrandEntity | null> {
    const data = await this.prisma.brand.findUnique({
      where: { id },
    });

    return data ? BrandMapper.toDomain(data) : null;
  }

  async create(entity: Partial<BrandEntity>): Promise<BrandEntity> {
    if (!entity.name) {
      throw new Error('Brand name is required');
    }

    const data = await this.prisma.brand.create({
      data: {
        name: entity.name,
        slug: entity.slug || null,
      },
    });

    return BrandMapper.toDomain(data);
  }

  async update(id: string, entity: Partial<BrandEntity>): Promise<BrandEntity> {
    const updateData: any = {};
    if (entity.name !== undefined) updateData.name = entity.name;
    if (entity.slug !== undefined) updateData.slug = entity.slug;

    const data = await this.prisma.brand.update({
      where: { id },
      data: updateData,
    });

    return BrandMapper.toDomain(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.brand.delete({
      where: { id },
    });
  }
}
