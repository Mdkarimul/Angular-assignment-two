import { ExceptionFilter, Catch, ArgumentsHost, HttpException, RpcExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;
@Catch(ValidationError)
export class ValidationErr implements RpcExceptionFilter{
    catch(exception: ValidationError, host: ArgumentsHost): any {
      console.log(exception);
        const ctx = host.switchToHttp(),
          response = ctx.getResponse();
    
        return response.status(400).json({
          statusCode: 400,
          createdBy: 'ValidationErrorFilter',
          errors:  Object.values(exception.errors).map(error => error.message),
        });
      }
}