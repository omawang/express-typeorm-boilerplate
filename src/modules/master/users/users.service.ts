import { getRepository, Not } from 'typeorm'
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes'

import { IErrorResponse } from 'src/shared/interfaces'
import { MsgErr, MsgTitleErr } from 'src/shared/constants'

import { User } from 'src/database/entities/master/user.entity'

import { UpdateProfileDto } from './dto/update-profile.dto'

export default {
  getProfile: async (id: number): Promise<User> => {
    const repository = getRepository(User)

    const user = await repository.findOne({ where: { id } })
    if (!user) {
      throw <IErrorResponse>{
        statusCode: NOT_FOUND,
        body: {
          success: false,
          messageTitle: MsgTitleErr[NOT_FOUND],
          message: MsgErr[NOT_FOUND],
        },
      }
    }
    return user
  },

  updateProfile: async (id: number, args: UpdateProfileDto): Promise<User> => {
    const repository = getRepository(User)

    const user = await repository.findOne({ where: { id } })
    if (!user) {
      throw <IErrorResponse>{
        statusCode: NOT_FOUND,
        body: {
          messageTitle: MsgTitleErr[NOT_FOUND],
          message: MsgErr[NOT_FOUND],
        },
      }
    }

    if (args.email !== user.email) {
      const checkEmail = await repository.findOne({
        where: { id: Not(id), email: args.email },
      })
      if (checkEmail) {
        throw <IErrorResponse>{
          statusCode: BAD_REQUEST,
          body: {
            messageTitle: MsgTitleErr[BAD_REQUEST],
            message: MsgErr[BAD_REQUEST],
            errors: { email: ['Email is already exist'] },
          },
        }
      }
    }

    if (args.phone !== user.phone) {
      const checkPhone = await repository.findOne({
        where: { id: Not(id), phone: args.phone },
      })
      if (checkPhone) {
        throw <IErrorResponse>{
          statusCode: BAD_REQUEST,
          body: {
            messageTitle: MsgTitleErr[BAD_REQUEST],
            message: MsgErr[BAD_REQUEST],
            errors: { phone: ['Phone is already exist'] },
          },
        }
      }
    }

    user.name = args.name
    user.phone = args.phone
    user.email = args.email
    user.profession = args.profession
    await user.save()

    return user
  },
}
