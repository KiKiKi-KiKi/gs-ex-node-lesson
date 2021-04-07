import { Request, Response, NextFunction } from 'express';

export type errorData = {
  [key: string]: any;
};

export class HttpException extends Error {
  statusCode?: number;
  message: string;
  data: errorData;

  constructor(statusCode: number, message: string, data?: errorData) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;
    this.data = data ? { ...data } : {};
  }
}

export const badRequestException = (
  message = '400 Bad Request',
  data?: errorData,
): HttpException => {
  return new HttpException(400, message, data);
};

export const unauthorizedException = (
  message = '401 Unauthorized',
  data?: errorData,
): HttpException => {
  return new HttpException(401, message, data);
};

export const forbiddenException = (
  message = '403 Forbidden',
  data?: errorData,
): HttpException => {
  return new HttpException(403, message, data);
};

export const notFoundException = (
  message = '404 Not Found',
  data?: errorData,
): HttpException => {
  return new HttpException(404, message, data);
};

export const internalServerErrorException = (
  message = '500 Internal Server Error',
  data?: errorData,
): HttpException => {
  return new HttpException(500, message, data);
};

export default function errorHandler(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.status(err.statusCode || 500);
  res.send({
    message: err.message,
    error: {
      ...err.data,
    },
  });
}
