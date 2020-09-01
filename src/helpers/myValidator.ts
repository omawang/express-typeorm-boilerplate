import { validate } from 'class-validator'
import { Response } from 'express'
import { BAD_REQUEST } from 'http-status-codes'

import { genErrorRes } from './myErrorRes'

const formatValidationError = (errors: any) => {
  // console.log(errors[0].property)
  if (!Array.isArray(errors)) {
    return Object.values(errors.constraints)
  } else {
    const result = {}
    errors.map((item) => {
      if (item.children.length === 0) {
        result[item.property] = Object.values(item.constraints)
      } else {
        result[item.property] = formatValidationError(item.children)
      }
    })

    return result
  }
}

export default async (res: Response, args: any) => {
  const errors = await validate(args)

  if (Array.isArray(errors) && errors.length > 0) {
    throw genErrorRes(BAD_REQUEST, null, formatValidationError(errors))
  }
}
