import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SnakeToCamelPipe } from './common/pipes/snake-to-camel.pipe';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ruta base global
  app.setGlobalPrefix('ecommerce/api');
   app.useGlobalPipes(
    new SnakeToCamelPipe(),
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());


  // CORS abierto (temporal)
  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();