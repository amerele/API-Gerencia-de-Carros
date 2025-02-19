/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';
import { JsonResponse } from './json-response.contract';
import messages from './messages';

export const Ok = (inner: any, message?: string): JsonResponse<any, any> => ({
  statusCode: HttpStatus.OK,
  message: message || messages.OK,
  inner,
  error: null,
});

export const Created = (
  inner: any,
  message?: string,
): JsonResponse<any, any> => ({
  statusCode: HttpStatus.CREATED,
  message: message || messages.CREATED,
  inner,
  error: null,
});
