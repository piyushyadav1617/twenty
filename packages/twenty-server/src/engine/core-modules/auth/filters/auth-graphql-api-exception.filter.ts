import { Catch, ExceptionFilter } from '@nestjs/common';

import {
  AuthException,
  AuthExceptionCode,
} from 'src/engine/core-modules/auth/auth.exception';
import {
  AuthenticationError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UserInputError,
} from 'src/engine/core-modules/graphql/utils/graphql-errors.util';

@Catch(AuthException)
export class AuthGraphqlApiExceptionFilter implements ExceptionFilter {
  catch(exception: AuthException) {
    switch (exception.code) {
      case AuthExceptionCode.USER_NOT_FOUND:
      case AuthExceptionCode.CLIENT_NOT_FOUND:
        throw new NotFoundError(exception.message);
      case AuthExceptionCode.INVALID_INPUT:
        throw new UserInputError(exception.message);
      case AuthExceptionCode.FORBIDDEN_EXCEPTION:
        throw new ForbiddenError(exception.message);
      case AuthExceptionCode.UNAUTHENTICATED:
        throw new AuthenticationError(exception.message);
      case AuthExceptionCode.INVALID_DATA:
      case AuthExceptionCode.INTERNAL_SERVER_ERROR:
      default:
        throw new InternalServerError(exception.message);
    }
  }
}
