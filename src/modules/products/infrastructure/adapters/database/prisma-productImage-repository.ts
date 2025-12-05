import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/database/prisma.service";
import { IProductImageRepository } from "src/modules/products/domain/repositories/producImage.repository";
import { ProductImageEntity } from "src/modules/products/domain/entities/producImage.entity";
import { PaginationDto } from "src/modules/products/application/dto/pagination.dto";
import { PaginatedResponse } from "src/modules/products/application/dto/paginated-response.dto";
import { ProductImageMapper } from "./productImage.mapper";

@Injectable()
export class PrismaProductImageRepository implements IProductImageRepository {

    constructor(private readonly prisma: PrismaService) { }

    async findAll(pagination?: PaginationDto): Promise<ProductImageEntity[] | PaginatedResponse<ProductImageEntity>> {
        if (!pagination) {
            const data = await this.prisma.productImage.findMany({
                where: { deleted_at: null },
            });
            return data.map(ProductImageMapper.toDomain);
        }

        const total = await this.prisma.productImage.count({
            where: { deleted_at: null },
        });

        const data = await this.prisma.productImage.findMany({
            where: { deleted_at: null },
            skip: pagination.getSkip(),
            take: pagination.limit,
            orderBy: { created_at: 'desc' },
        });

        const mapped = data.map(ProductImageMapper.toDomain);
        
        // Retornamos un objeto plano con data al nivel superior
        return {
            data: mapped,
            total,
            page: pagination.page,
            limit: pagination.limit,
            totalPages: Math.ceil(total / pagination.limit),
        } as any;
    }

    async findById(id: string): Promise<ProductImageEntity | null> {
        const data = await this.prisma.productImage.findFirst({
            where: {
                id,
                deleted_at: null,
            }
        });
        return data ? ProductImageMapper.toDomain(data) : null;
    }

    async create(entity: ProductImageEntity): Promise<ProductImageEntity> {
        const raw = ProductImageMapper.toPersistence(entity);
        const data = await this.prisma.productImage.create({
            data: raw,
        })
        return ProductImageMapper.toDomain(data);
    }

    async update(id: string, partial: Partial<ProductImageEntity>): Promise<ProductImageEntity> {
        const raw = ProductImageMapper.toPersistence(partial as ProductImageEntity);

        const data = await this.prisma.productImage.update({
            where: { id },
            data: raw,
        });

        return ProductImageMapper.toDomain(data);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.productImage.delete({ where: { id } });
    }

    async softDelete(id: string | number): Promise<void> {
        await this.prisma.productImage.update({
            where: { id: String(id) },
            data: { deleted_at: new Date() },
        });
    }

}