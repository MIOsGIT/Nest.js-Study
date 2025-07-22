import { NestFactory } from '@nestjs/core';
import { HelloModule } from './hello2/hello.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
