import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nexrahub Core API Documentation')
    .setDescription('API documentation for Nexrahub Core services')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${PORT}/`, 'Local environment')
    // .addSecurity('telegram-auth', {
    //   type: 'apiKey',
    //   name: 'x-init-data',
    //   in: 'header',
    // })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();
