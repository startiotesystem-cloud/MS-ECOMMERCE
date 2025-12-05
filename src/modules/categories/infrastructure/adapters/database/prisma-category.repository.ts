import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { ICategoryRepository } from 'src/modules/categories/domain/repositories/category.repository';
import { CategoryEntity } from 'src/modules/categories/domain/entities/category.entity';
import { PaginationDto } from 'src/modules/products/application/dto/pagination.dto';
import { CategoryMapper } from './category.mapper';

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination?: PaginationDto): Promise<CategoryEntity[] | any> {
    if (!pagination) {
      const data = await this.prisma.category.findMany({
        where: { deleted_at: null },
        include: {
          parent: true,
          children: {
            where: { deleted_at: null },
          },
        },
      });
      return data.map(CategoryMapper.toDomain);
    }

    const total = await this.prisma.category.count({
      where: { deleted_at: null },
    });

    const data = await this.prisma.category.findMany({
      where: { deleted_at: null },
      skip: pagination.getSkip(),
      take: pagination.limit,
      orderBy: { created_at: 'desc' },
      include: {
        parent: true,
        children: {
          where: { deleted_at: null },
        },
      },
    });

    const mapped = data.map(CategoryMapper.toDomain);

    return {
      data: mapped,
      total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(total / pagination.limit),
    };
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const data = await this.prisma.category.findFirst({
      where: {
        id,
        deleted_at: null,
      },
      include: {
        parent: true,
        children: {
          where: { deleted_at: null },
        },
      },
    });
    return data ? CategoryMapper.toDomain(data) : null;
  }

  async create(entity: CategoryEntity): Promise<CategoryEntity> {
    const raw = CategoryMapper.toPersistence(entity);

    const data = await this.prisma.category.create({
      data: {
        name: raw.name ?? '',
        slug: raw.slug,
        description: raw.description,
        parent_id: raw.parent_id,
      },
      include: {
        parent: true,
        children: true,
      },
    });

    return CategoryMapper.toDomain(data);
  }

  async update(id: string, partial: Partial<CategoryEntity>): Promise<CategoryEntity> {
    const raw = CategoryMapper.toPersistence(partial);

    const updateData: any = {
      updated_at: new Date(),
    };

    if (raw.name !== undefined) updateData.name = raw.name;
    if (raw.slug !== undefined) updateData.slug = raw.slug;
    if (raw.description !== undefined) updateData.description = raw.description;
    if (raw.parent_id !== undefined) updateData.parent_id = raw.parent_id;

    const data = await this.prisma.category.update({
      where: { id },
      data: updateData,
      include: {
        parent: true,
        children: true,
      },
    });

    return CategoryMapper.toDomain(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }

  async softDelete(id: string | number): Promise<void> {
    await this.prisma.category.update({
      where: { id: String(id) },
      data: { deleted_at: new Date() },
    });
  }
}
