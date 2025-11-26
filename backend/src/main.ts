import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos que não estão no DTO (segurança)
      forbidNonWhitelisted: true, // Retorna erro se enviarem campos extras
      transform: true, // Transforma os dados para o tipo especificado no DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
