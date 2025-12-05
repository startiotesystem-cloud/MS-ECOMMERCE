// GUÍA DE IMPLEMENTACIÓN PARA SOFT DELETE Y PAGINACIÓN
// Copiar y adaptar estos métodos a los repositorios Prisma existentes

// ============================================
// PRODUCTO REPOSITORY IMPLEMENTATION
// ============================================

// En PrismaProductRepository, reemplaza o agrega estos métodos:

async findAll(pagination?: PaginationDto) {
  // Si no se proporciona paginación, retornar todos sin paginación
  if (!pagination) {
    const products = await this.prisma.product.findMany({
      where: { deleted_at: null },
    });
    return products.map(p => ProductMapper.toDomain(p));
  }

  // Con paginación
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

async softDelete(id: string | number): Promise<void> {
  await this.prisma.product.update({
    where: { id: String(id) },
    data: { deleted_at: new Date() },
  });
}

// ============================================
// PRODUCTO IMAGE REPOSITORY IMPLEMENTATION
// ============================================

// En PrismaProductImageRepository, reemplaza o agrega estos métodos:

async findAll(pagination?: PaginationDto) {
  // Si no se proporciona paginación, retornar todos sin paginación
  if (!pagination) {
    const images = await this.prisma.productImage.findMany({
      where: { deleted_at: null },
    });
    return images.map(i => ProductImageMapper.toDomain(i));
  }

  // Con paginación
  const total = await this.prisma.productImage.count({
    where: { deleted_at: null },
  });

  const images = await this.prisma.productImage.findMany({
    where: { deleted_at: null },
    skip: pagination.getSkip(),
    take: pagination.limit,
    orderBy: { created_at: 'desc' },
  });

  return new PaginatedResponse(
    images.map(i => ProductImageMapper.toDomain(i)),
    total,
    pagination.page,
    pagination.limit,
  );
}

async softDelete(id: string | number): Promise<void> {
  await this.prisma.productImage.update({
    where: { id: String(id) },
    data: { deleted_at: new Date() },
  });
}

// ============================================
// IMPORTANTE
// ============================================
// 1. Ejecutar la migración: npm run prisma:migrate:dev
//    (Cuando la base de datos esté disponible)
//
// 2. Asegurarse de importar PaginationDto y PaginatedResponse
//    en los archivos de repositorio
//
// 3. Los tipos de retorno en findAll() pueden ser:
//    - ProductEntity[] (si no hay paginación)
//    - PaginatedResponse<ProductEntity> (si hay paginación)
//
// 4. El soft delete es transparente en las consultas:
//    Siempre se filtra por deleted_at: null
