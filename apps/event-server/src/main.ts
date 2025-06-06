import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {GlobalExceptionFilter} from "./common/dtos/global-exception.filter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  console.log('MongoDB URI:', process.env.MONGODB_URI);

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
      .setTitle('API 문서')
      .setDescription('이벤트 관련 API 명세')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs/event', app, document);

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
