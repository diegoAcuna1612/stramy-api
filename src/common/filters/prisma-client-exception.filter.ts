import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import {Response} from 'express';
import { Request } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';

    if (exception.code === 'P2003') {
      status = HttpStatus.BAD_REQUEST;

      const driverError = (exception.meta?.driverAdapterError as any);
      const cause = driverError?.cause;
      const constraintName = cause?.constraint?.index; 
      const fieldName = constraintName?.split('_').slice(1, -1).join('_') || 'desconocido';
      
      message = `Error de relación: No existe un registro relacionado para el campo '${fieldName}'. Verifica que el ID proporcionado exista en la tabla correspondiente.`;
    }
    
    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Bad Request',
      timestamp: new Date().toISOString(),
      path: request.url,
    });

  }
}
