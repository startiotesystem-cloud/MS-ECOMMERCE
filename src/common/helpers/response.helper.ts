// src/common/helpers/response.helper.ts

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  data: null | Record<string, unknown>;
  timestamp: string;
}

export class ResponseHelper {
  static success<T>(
    data: T,
    message = 'Operación exitosa',
  ): SuccessResponse<T> | T {
    if (
      data &&
      typeof data === 'object' &&
      'success' in data &&
      'message' in data &&
      'data' in data &&
      'timestamp' in data
    ) {
      return data as T;
    }

    // Detectar si es una respuesta paginada (tiene data, total, page, limit, totalPages)
    const isPaginatedResponse =
      data &&
      typeof data === 'object' &&
      'data' in data &&
      'total' in data &&
      'page' in data &&
      'limit' in data &&
      'totalPages' in data &&
      Array.isArray((data as any).data);

    if (isPaginatedResponse) {
      // Para respuestas paginadas, retornar con estructura: { success, message, data: [...], total, page, limit, totalPages, timestamp }
      const paginatedData = data as any;
      return {
        success: true,
        message,
        data: paginatedData.data,
        total: paginatedData.total,
        page: paginatedData.page,
        limit: paginatedData.limit,
        totalPages: paginatedData.totalPages,
        timestamp: new Date().toISOString(),
      } as any;
    }

    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static error(
    message = 'Ocurrió un error',
    data: null | Record<string, unknown> = null,
  ): ErrorResponse {
    return {
      success: false,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }
}