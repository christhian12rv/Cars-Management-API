import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZodFilter } from './shared/filters/ZodFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cars Management API')
    .setDescription(
      'API developed in NestJs responsible for managing the registration and use of cars and their drivers',
    )
    .setVersion('1.0')
    .addTag('cars')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalFilters(new ZodFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
