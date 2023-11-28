import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3002)
    .then(() => {
      console.log("successfully stared on port 3002");
    }).catch((err) => {
      console.log(err);
    });
}
bootstrap();
