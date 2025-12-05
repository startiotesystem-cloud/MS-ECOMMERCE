import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/modules/categories/application/use-cases/create-category.usecase';
import { GetAllCategoriesUseCase } from 'src/modules/categories/application/use-cases/get-all-categories.usecase';
import { GetCategoryByIdUseCase } from 'src/modules/categories/application/use-cases/get-category-by-id.usecase';
import { UpdateCategoryUseCase } from 'src/modules/categories/application/use-cases/update-category.usecase';
import { DeleteCategoryUseCase } from 'src/modules/categories/application/use-cases/delete-category.usecase';
import { CreateCategoryDto } from 'src/modules/categories/application/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/modules/categories/application/dto/update-category.dto';
import { PaginationDto } from 'src/modules/products/application/dto/pagination.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.createCategoryUseCase.execute(createCategoryDto);
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
    return await this.getAllCategoriesUseCase.execute(pagination);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.getCategoryByIdUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.updateCategoryUseCase.execute(id, updateCategoryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteCategoryUseCase.execute(id);
  }
}
