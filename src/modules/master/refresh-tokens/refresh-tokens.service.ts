import { getRepository } from 'typeorm'
import { RefreshToken } from '@database/entities/master/refresh-token.entity'

class RefreshTokensService {
  async save(userId: number, token: string) {
    const repository = getRepository(RefreshToken)

    const check = await repository.findOne({ where: { user_id: userId } })
    if (!check) {
      await repository.insert({ user_id: userId, token })
      // const refreshToken = new RefreshToken()
      // refreshToken.user_id = userId
      // refreshToken.token = token
      // await refreshToken.save()
    } else {
      console.log('ada')
      check.token = token
      await check.save()
    }
  }
}

export default RefreshTokensService
