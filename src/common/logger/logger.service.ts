import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

const PREVENTED_CONTEXTS = [
  'InstanceLoader',
  'RouterExplorer',
  'RoutesResolver',
  'TerminusExplorer',
];

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger = console;

  log(message: string, context?: string): void {
    this.writeLog('info', message, context);
  }

  warn(message: string, context?: string): void {
    this.writeLog('warn', message, context);
  }

  error(message: string, trace: unknown, context?: string): void {
    this.writeLog('error', message, context, trace);
  }

  debug(message: string, context?: string): void {
    this.writeLog('debug', message, context);
  }

  verbose(message: string, context?: string): void {
    this.writeLog('log', message, context);
  }

  /**
   * Writes a log message
   *
   * @param level    The log level
   * @param message  The message
   * @param context  The context
   * @param args     Additional context
   */
  private writeLog(
    level: 'info' | 'debug' | 'error' | 'warn' | 'log',
    message: string,
    context?: string,
    ...args: unknown[]
  ): void {
    if (level === 'info' && PREVENTED_CONTEXTS.includes(context as string)) {
      return;
    }

    if (context) {
      this.logger[level](`[${context}] ${message}`, args);
    } else {
      this.logger[level](message, args);
    }
  }
}
