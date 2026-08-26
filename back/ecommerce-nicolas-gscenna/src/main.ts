import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const swaggerConfig = new DocumentBuilder()
                              .setTitle('')
                              .setDescription('')
                              .setVersion('1.0')
                              .addBearerAuth()
                              .build();

  const document = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup('api',app,document)
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
