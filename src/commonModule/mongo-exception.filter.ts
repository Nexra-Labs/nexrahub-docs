import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'A MongoDB error occurred';

    switch (exception.code) {
      case 11000: // Duplicate key error
        status = HttpStatus.BAD_REQUEST;
        message = 'Duplicate key error: A unique field already exists';
        break;
      //TODO: Add other MongoDB-specific codes
      default:
        message = `MongoDB Error: ${exception.message}`;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
