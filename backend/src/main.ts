import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
      origin: [process.env.FRONTEND_URL],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    });
    const port = process.env.PORT ?? 8000;
    await app.listen(port);
    console.log(`App listening on port ${port}`);
  } catch (err) {
    console.error('Error during app bootstrap:', err);
    process.exit(1);
  }
}
bootstrap();
