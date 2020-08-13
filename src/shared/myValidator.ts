import { validate } from 'class-validator'
import { Response } from 'express'
import { BAD_REQUEST } from 'http-status-codes'

import { IErrorResponse } from './interfaces'
import { MsgTitleErr, MsgErr } from './constants'

const formatValidationError = (errors: any) => {
  // console.log(errors[0].property)
  if (!Array.isArray(errors)) {
    return Object.values(errors.constraints)
  } else {
    const result = {}
    errors.map((item) => {
      result[item.property] = Object.values(item.constraints)
    })

    return result
  }
}

export default async (res: Response, args: any) => {
  const errors = await validate(args)

  if (Array.isArray(errors) && errors.length > 0) {
    throw <IErrorResponse>{
      statusCode: BAD_REQUEST,
      body: {
        success: false,
        messageTitle: MsgTitleErr[BAD_REQUEST],
        message: MsgErr[BAD_REQUEST],
        errors: formatValidationError(errors),
      },
    }
  }
}
