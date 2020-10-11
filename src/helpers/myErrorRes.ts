import { IErrorResponse } from '@commons/interfaces'
import { MsgTitleErr, MsgErr } from '@commons/constants'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'

export const genErrorRes = (
  statusCode: number,
  message?: string,
  errors?: any
): IErrorResponse => {
  const myErrors: IErrorResponse = {
    statusCode: statusCode,
    body: {
      success: false,
      messageTitle:
        MsgTitleErr[statusCode] || MsgTitleErr[INTERNAL_SERVER_ERROR],
      message: message
        ? message
        : MsgErr[statusCode] || MsgErr[INTERNAL_SERVER_ERROR],
    },
  }

  if (errors) {
    myErrors['errors'] = errors
  }

  return myErrors
}
