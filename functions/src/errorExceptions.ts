import { Request, Response, NextFunction } from 'express';

class HttpException extends Error {
  statusCode?: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;
  }
}

export const badRequestException = (
  message = '400 Bad Request',
): HttpException => {
  return new HttpException(400, message);
};

export const unauthorizedException = (
  message = '401 Unauthorized',
): HttpException => {
  return new HttpException(401, message);
};

export const forbiddenException = (
  message = '403 Forbidden',
): HttpException => {
  return new HttpException(403, message);
};

export const notFoundException = (message = '404 Not Found'): HttpException => {
  return new HttpException(404, message);
};

export const internalServerErrorException = (
  message = '500 Internal Server Error',
): HttpException => {
  return new HttpException(500, message);
};

export default function errorHandler(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.status(err.statusCode || 500);
  res.send({
    error: {
      ...err,
      message: err.message,
    },
  });
}
