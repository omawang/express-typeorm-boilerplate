import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'

import validator from 'src/shared/myValidator'
import { IErrorResponse } from 'src/shared/interfaces'
import { MsgErr } from 'src/shared/constants'

import authService from './auth.service'
import usersService from './users.service'

import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'

export default {
  register: async (req: Request, res: Response) => {
    try {
      const args: RegisterDto = plainToClass(RegisterDto, req.body)
      await validator(res, args)

      const result = await authService.register(args)
      return res.status(CREATED).json(result)
    } catch (error) {
      return res
        .status((error as IErrorResponse).statusCode || INTERNAL_SERVER_ERROR)
        .json(
          (error as IErrorResponse).body || {
            message: MsgErr[INTERNAL_SERVER_ERROR],
          }
        )
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const args: LoginDto = plainToClass(LoginDto, req.body)
      await validator(res, args)

      const result = await authService.login(args)
      return res.status(OK).json(result)
    } catch (error) {
      console.log(error)
      return res
        .status((error as IErrorResponse).statusCode)
        .json((error as IErrorResponse).body)
    }
  },

  getProfile: async (req: Request, res: Response) => {
    try {
      const result = await usersService.getProfile((req as any).user.data.id)
      return res.status(OK).json(result)
    } catch (error) {
      return res
        .status((error as IErrorResponse).statusCode)
        .json((error as IErrorResponse).body)
    }
  },

  updateProfile: async (req: Request, res: Response) => {
    try {
      const args: UpdateProfileDto = plainToClass(UpdateProfileDto, req.body)
      await validator(res, args)

      const result = await usersService.updateProfile(
        (req as any).user.data.id,
        args
      )
      return res.status(OK).json(result)
    } catch (error) {
      return res
        .status((error as IErrorResponse).statusCode)
        .json((error as IErrorResponse).body)
    }
  },
}
