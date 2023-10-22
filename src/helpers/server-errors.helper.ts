import { HttpErrorResponse } from '@angular/common/http';
import { AUTH_ERROR, UNKNOWN_ERROR } from 'src/constants/commons';

export class ServerErrorHelper {
  static getErrorMsg(errResponse: HttpErrorResponse) {
    try {
      let errorMessage: string = errResponse.error.message;
      let authentication: boolean = errResponse.status === 401;
      return errorMessage ? errorMessage : authentication ? AUTH_ERROR : UNKNOWN_ERROR;
    } catch (error) {
      return UNKNOWN_ERROR;
    }
  }
}
