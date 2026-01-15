import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //app.useGlobalPipes(new ValidationPipe({
  //  whitelist: true,
  //}));

  const config = new DocumentBuilder()
    .setTitle('Stramy')
    .setDescription('The Stramy API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalFilters(new PrismaClientExceptionFilter());


  app.enableCors(); 


  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
