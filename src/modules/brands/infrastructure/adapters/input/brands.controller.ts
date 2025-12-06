import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateBrandUseCase } from 'src/modules/brands/application/use-cases/create-brand.usecase';
import { GetAllBrandsUseCase } from 'src/modules/brands/application/use-cases/get-all-brands.usecase';
import { GetBrandByIdUseCase } from 'src/modules/brands/application/use-cases/get-brand-by-id.usecase';
import { UpdateBrandUseCase } from 'src/modules/brands/application/use-cases/update-brand.usecase';
import { DeleteBrandUseCase } from 'src/modules/brands/application/use-cases/delete-brand.usecase';
import { CreateBrandDto } from 'src/modules/brands/application/dto/create-brand.dto';
import { UpdateBrandDto } from 'src/modules/brands/application/dto/update-brand.dto';
import { PaginationDto } from 'src/modules/products/application/dto/pagination.dto';

@Controller('brands')
export class BrandsController {
  constructor(
    private readonly createBrandUseCase: CreateBrandUseCase,
    private readonly getAllBrandsUseCase: GetAllBrandsUseCase,
    private readonly getBrandByIdUseCase: GetBrandByIdUseCase,
    private readonly updateBrandUseCase: UpdateBrandUseCase,
    private readonly deleteBrandUseCase: DeleteBrandUseCase,
  ) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.createBrandUseCase.execute(createBrandDto);
  }

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    let pagination: PaginationDto | undefined;
    if (page || limit) {
      pagination = new PaginationDto(
        page ? parseInt(page, 10) : 1,
        limit ? parseInt(limit, 10) : 10,
      );
    }
    return await this.getAllBrandsUseCase.execute(pagination);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.getBrandByIdUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return await this.updateBrandUseCase.execute(id, updateBrandDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteBrandUseCase.execute(id);
  }
}
