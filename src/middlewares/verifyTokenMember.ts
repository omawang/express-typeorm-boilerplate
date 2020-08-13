import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { UNAUTHORIZED, FORBIDDEN } from 'http-status-codes'
import { MsgTitleErr } from 'src/shared/constants'

const { JWT_SECRET_ACCESS_TOKEN } = process.env

const verifyTokenMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization.split(' ')
  if (token[0] !== 'Bearer') {
    return res.status(UNAUTHORIZED).json({
      success: false,
      messageTitle: MsgTitleErr[UNAUTHORIZED],
      message: 'invalid authorization format',
    })
  }

  jwt.verify(token[1], JWT_SECRET_ACCESS_TOKEN as string, (err, decoded) => {
    if (err) {
      let statusCode = err.message === 'jwt expired' ? FORBIDDEN : UNAUTHORIZED
      return res.status(statusCode).json({
        success: false,
        messageTitle: MsgTitleErr[UNAUTHORIZED],
        message: err.message,
      })
    }

    ;(req as any).user = decoded
    return next()
  })
}

export default verifyTokenMember
