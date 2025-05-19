import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {GlobalExceptionFilter} from "./common/dtos/global-exception.filter";

async function bootstrap() {
  console.log('MongoDB URI:', process.env.MONGODB_URI);

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
