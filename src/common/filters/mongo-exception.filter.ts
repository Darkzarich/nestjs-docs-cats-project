import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { mongo } from 'mongoose';
import { Response } from 'express';

@Catch(mongo.MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly entity: string = 'Record';

  constructor(entity?: string) {
    this.entity = entity;
  }

  catch(exception: mongo.MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 11000:
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: [`${this.entity} already exists.`],
          error: 'Conflict',
        });
        break;
      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ['An unknown database error occurred.'],
          error: 'Internal Server Error',
        });
        break;
    }
  }
}
