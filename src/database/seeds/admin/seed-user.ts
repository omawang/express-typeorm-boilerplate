import { getRepository } from 'typeorm'
import { User } from '@database/entities/admin/user.entity'

import { usersData } from './data/users.data'

export const seedUser = async () => {
  const repository = getRepository(User)

  for (let i = 0; i < usersData.length; i++) {
    const item = usersData[i]

    const check = await repository.findOne({ where: { email: item.email } })
    if (!check) {
      const user = new User()
      user.usergroup = item.usergroup
      user.name = item.name
      user.email = item.email
      user.phone = item.phone
      user.password = item.password
      await user.save()
    } else {
      check.usergroup = item.usergroup
      check.name = item.name
      check.email = item.email
      check.phone = item.phone
      check.password = item.password
      await check.save()
    }
  }

  console.log('seedUser done')
}
