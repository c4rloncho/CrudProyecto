import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // Cambia esto con la URL de tu servidor RabbitMQ
      queue: 'microservicio-queue', // Nombre de la cola
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();
}
bootstrap();
