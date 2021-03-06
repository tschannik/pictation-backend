import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from './common/config/config.module';
import { ConfigService } from './common/config/config.service';
import { getCorsSettings } from './common/util/cors.settings';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));

  const configService = app.select(ConfigModule).get(ConfigService, { strict: true });
  app.enableCors(getCorsSettings(configService.corsAllowedOrigins));

  const options = new DocumentBuilder()
    .setTitle(configService.appName)
    .addBearerAuth({ type: 'oauth2', name: 'authorization' }, 'header')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(configService.swaggerPrefix, app, document);

  app.use(compression());
  app.use(helmet());
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
    }),
  );
  app.use(csurf());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.setGlobalPrefix('/api');

  await app.listen(configService.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
