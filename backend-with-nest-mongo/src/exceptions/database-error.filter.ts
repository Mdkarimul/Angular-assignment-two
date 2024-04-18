import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MongoError } from 'mongodb';
@Catch(MongoError)
export class DatabaseError extends BaseExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception.message);
     let error;
    switch(exception.code){
      case 11000 : {
      error = {
        statusCode:HttpStatus.CONFLICT,
        message: "Duplicate key found  !"
      }
      break;
      }
       default : {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Internal Server error !"
        }
        break;
      }
    }
    response.status(error.statusCode).json(error);
  }
}