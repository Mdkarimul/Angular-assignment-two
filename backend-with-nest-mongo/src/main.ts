import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseError } from './exceptions/database-error.filter';
import { ValidationErr } from './exceptions/validation-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new DatabaseError());
  app.useGlobalFilters(new ValidationErr());
  await app.listen(3000);
}
bootstrap();
