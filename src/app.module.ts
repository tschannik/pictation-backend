import { ConfigModule } from './common/config/config.module';
import { DatabaseModule } from './common/database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';
import { CollectionsModule } from './collections/collections.module';

/**
 * MAKE SURE LOGGERMODULE IS LAST IN IMPORT LIST
 * DOES NOT MAKE ANY SENSE BUT BREAKS EVERYTHING
 * (ノಠ益ಠ)ノ彡┻━┻
 */
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    LocationsModule,
    UsersModule,
    CollectionsModule,
    DatabaseModule,
    ConfigModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
