import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, _: Response, next: NextFunction): void {
    this.logger.log(
      `Requesting ${req.method} ${req.originalUrl} / Params: ${JSON.stringify(
        req.query,
      )} / Payload: ${JSON.stringify(req.body)}`,
    );

    next();
  }
}
