import { getRepository, Not } from 'typeorm'
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes'

import { genErrorRes } from '@helpers/myErrorRes'

import { User } from '@database/entities/master/user.entity'

import { UpdateProfileDto } from './dto/update-profile.dto'

class UsersService {
  async getProfile(id: number): Promise<User> {
    const repository = getRepository(User)

    const user = await repository.findOne({ where: { id } })
    if (!user) {
      throw genErrorRes(NOT_FOUND)
    }
    return user
  }

  async updateProfile(id: number, args: UpdateProfileDto): Promise<User> {
    const repository = getRepository(User)

    const user = await repository.findOne({ where: { id } })
    if (!user) {
      throw genErrorRes(NOT_FOUND)
    }

    if (args.email !== user.email) {
      const checkEmail = await repository.findOne({
        where: { id: Not(id), email: args.email },
      })
      if (checkEmail) {
        throw genErrorRes(BAD_REQUEST, null, {
          email: ['Email is already exist'],
        })
      }
    }

    if (args.phone !== user.phone) {
      const checkPhone = await repository.findOne({
        where: { id: Not(id), phone: args.phone },
      })
      if (checkPhone) {
        throw genErrorRes(BAD_REQUEST, null, {
          phone: ['Phone is already exist'],
        })
      }
    }

    user.name = args.name
    user.phone = args.phone
    user.email = args.email
    user.profession = args.profession
    await user.save()

    return user
  }
}

export default UsersService
