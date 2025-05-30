import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('API de gerenciamento de carros')
      .setDescription(
        'API desenvolvida em NestJs responsável por gerenciar o cadastro e uso de carros e seus motoristas',
      )
      .setVersion('1.0')
      .addTag('cars')
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(new ValidationPipe());

    const port = process.env.PORT ?? 5500;
    await app.listen(port);

    logger.log(`Application is running on: http://localhost:${port}`);
    logger.log(`Swagger is running on: http://localhost:${port}/api`);
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
