import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { DatabaseType } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import {default as corsConfig} from './cors-config/cors-config.json';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    dotenv.config({ path: filePath });
    this.envConfig = this.validateEnv();
  }

  /**
   * Environment configuration
   */

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get port(): number {
    return +this.envConfig.PORT;
  }

  /**
   * Current Stage (NOT NODE_ENV)
   */
  get stage(): string {
    return this.envConfig.STAGE;
  }

  /**
   * Application
   */

  get appName(): string {
    return this.envConfig.APP_NAME;
  }

  get swaggerPrefix(): string {
    return this.envConfig.SWAGGER_PREFIX;
  }

  get corsAllowedOrigins(): string[] {
    return corsConfig[this.stage];
  }

  /**
   * Database configuration
   */

  get databaseHost(): string {
    return this.envConfig.DATABASE_HOST;
  }

  get databaseUser(): string {
    return this.envConfig.DATABASE_USER;
  }

  get databasePassword(): string {
    return this.envConfig.DATABASE_PASSWORD;
  }

  get databasePort(): number {
    return +this.envConfig.DATABASE_PORT;
  }

  get databaseName(): string {
    return this.envConfig.DATABASE_NAME;
  }

  get databaseType(): DatabaseType {
    return this.envConfig.DATABASE_TYPE as DatabaseType;
  }

  get databaseSynchronize(): boolean {
    return Boolean(this.envConfig.DATABASE_SYNCHRONIZE);
  }

  get databaseLogging(): LoggerOptions {
    return this.envConfig.DATABASE_LOGGING?.split(',') as LoggerOptions;
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateEnv(): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(4000),
      APP_NAME: Joi.string().required(),
      STAGE: Joi.string().valid('development', 'integration', 'production').default('development'),
      SWAGGER_PREFIX: Joi.string().default('swagger'),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().allow(''),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_TYPE: Joi.string().default('mysql'),
      DATABASE_PORT: Joi.number().default(3306),
      DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
      DATABASE_LOGGING: Joi.string().default('error'),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(process.env, {
      allowUnknown: true,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}
