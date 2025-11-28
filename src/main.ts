import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SnakeToCamelPipe } from './common/pipes/snake-to-camel.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ruta base global
  app.setGlobalPrefix('ecommerce/api');
  app.useGlobalPipes(new SnakeToCamelPipe());


  // CORS abierto (temporal)
  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();