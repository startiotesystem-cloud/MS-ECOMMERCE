import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/database/prisma.service";
import { IProductImageRepository } from "src/modules/products/domain/repositories/producImage.repository";
import { ProductImageEntity } from "src/modules/products/domain/entities/producImage.entity";
import { ProductImageMapper } from "./productImage.mapper";

@Injectable()
export class PrismaProductImageRepository implements IProductImageRepository {

    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<ProductImageEntity[]> {
        const data = await this.prisma.productImage.findMany();
        return data.map(ProductImageMapper.toDomain);
    }

    async findById(id: string): Promise<ProductImageEntity | null> {
        const data = await this.prisma.productImage.findUnique({
            where: { id }
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

}