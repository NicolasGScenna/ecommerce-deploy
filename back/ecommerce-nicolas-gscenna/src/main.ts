import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors)=>{
        const cleanErrors = errors.map(error=>{
          return {property : error.property, constraints: error.constraints}
        });
        return new BadRequestException({
          alert: "Se han detectado los siguentes errores en la petición:",
          errors: cleanErrors
        })
      }
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
