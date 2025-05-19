import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {GlobalExceptionFilter} from "./common/dtos/global-exception.filter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  console.log('MongoDB URI:', process.env.MONGODB_URI);

  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
      .setTitle('Event & Reward API')
      .setDescription('Event and Reward Management API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
