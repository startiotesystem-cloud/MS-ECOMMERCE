import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResponseHelper } from '../helpers/response.helper';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        // Si la respuesta ya tiene la estructura esperada (ya envuelta), la devolvemos tal cual.
        if (
          data &&
          typeof data === 'object' &&
          'success' in data &&
          'message' in data &&
          'timestamp' in data
        ) {
          return data;
        }

        // Detectar si es una respuesta paginada (tiene data array, total, page, limit, totalPages)
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
          // Para respuestas paginadas, usar ResponseHelper que maneja la estructura
          return ResponseHelper.success(data as T);
        }

        // Para respuestas normales (arrays o objetos simples)
        return ResponseHelper.success(data as T);
      }),
      catchError((err: unknown) => {
        // Si ya es una HttpException, preservamos su status y response
        if (err instanceof HttpException) {
          const status = err.getStatus();
          const response = err.getResponse();

          // Si la respuesta ya tiene la forma de ErrorResponse, la lanzamos tal cual
          if (
            response &&
            typeof response === 'object' &&
            'success' in response &&
            'message' in response &&
            'data' in response &&
            'timestamp' in response
          ) {
            return throwError(() => new HttpException(response, status));
          }

          // Construimos un ErrorResponse preservando datos útiles
          const message =
            (response && (response as any).message) || err.message || 'Error';
          const data =
            response && (response as any).data
              ? (response as any).data
              : { exception: (err as any).name };

          return throwError(
            () => new HttpException(ResponseHelper.error(message, data), status),
          );
        }

        // Errores no controlados -> 500
        const message = err instanceof Error ? err.message : 'Unexpected error';
        const data =
          err && typeof err === 'object' && 'stack' in (err as any)
            ? { stack: (err as any).stack }
            : null;

        return throwError(
          () =>
            new HttpException(
              ResponseHelper.error(message, data as Record<string, unknown> | null),
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }
}
