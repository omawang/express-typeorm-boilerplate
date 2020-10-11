import { getRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes'

import { genErrorRes } from '@helpers/myErrorRes'

import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

import RefreshTokensService from '@modules/master/refresh-tokens/refresh-tokens.service'

import { User } from '@database/entities/master/user.entity'

const {
  JWT_SECRET_ACCESS_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env

class AuthService {
  async register(args: RegisterDto) {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({
      where: [{ email: args.email }, { phone: args.phone }],
    })
    if (user) {
      const errors =
        user.email === args.email
          ? {
              email: ['email already exist'],
            }
          : {
              phone: ['phone already exist'],
            }
      throw genErrorRes(BAD_REQUEST, null, errors)
    }

    const newUser = new User()
    newUser.name = args.name
    newUser.profession = args.profession
    newUser.phone = args.phone
    newUser.email = args.email
    newUser.password = args.password
    newUser.pin = args.pin
    await newUser.save()

    return {
      success: true,
      messageTitle: 'Success',
      message: 'Success',
      data: {
        id: newUser.id,
      },
    }
  }

  async login(args: LoginDto) {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({
      select: ['id', 'name', 'phone', 'email', 'password'],
      where: { email: args.email },
    })

    if (!user) {
      throw genErrorRes(NOT_FOUND, null, {
        email: ['email not found'],
      })
    }

    const validPass = await bcrypt.compare(args.password, user.password)
    if (!validPass) {
      throw genErrorRes(NOT_FOUND, 'User not found')
    }

    const data = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    }
    // generate token
    const token = jwt.sign({ data }, JWT_SECRET_ACCESS_TOKEN as string, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    })
    const refreshToken = jwt.sign(
      { data },
      JWT_SECRET_REFRESH_TOKEN as string,
      {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
      }
    )

    // save refresh token
    await new RefreshTokensService().save(data.id, refreshToken)

    return {
      token,
      refresh_token: refreshToken,
    }
  }
}

export default AuthService
