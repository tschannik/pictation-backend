import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { UnauthorizedException } from '@nestjs/common';
import { ErrorCodes } from '../errors/ErrorCodes.enum';

export const getCorsSettings = (allowedOrigins: string[]): CorsOptions => ({
  origin(origin: string, callback: (err: Error | null, allow?: boolean) => void): void {
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin) || !origin) {
      return callback(null, true);
    }
    return callback(new UnauthorizedException('Origin not allowed.', ErrorCodes.FORBIDDEN_ORIGIN));
  },
});
