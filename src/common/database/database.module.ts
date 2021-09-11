import { Module, Global } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.databaseType,
          host: configService.databaseHost,
          port: configService.databasePort,
          username: configService.databaseUser,
          logging: configService.databaseLogging,
          password: configService.databasePassword,
          database: configService.databaseName,
          entities: [__dirname + '/../../**/*.{entity,view}{.ts,.js}'],
          synchronize: configService.databaseSynchronize,
        } as Partial<TypeOrmModuleOptions>;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
