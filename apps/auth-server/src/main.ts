import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  console.log('MongoDB URI:', process.env.MONGODB_URI);

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('API 문서')
      .setDescription('유저 관련 API 명세')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs/user', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
