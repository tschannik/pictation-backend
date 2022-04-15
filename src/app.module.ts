import { LoggerMiddleware } from './common/logger/logger.middleware';
import { ConfigModule } from './common/config/config.module';
import { DatabaseModule } from './common/database/database.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';
import { CollectionsModule } from './collections/collections.module';

@Module({
  imports: [LocationsModule, UsersModule, CollectionsModule, DatabaseModule, ConfigModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
