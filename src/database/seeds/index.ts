import 'src/loadEnv'
import { createConnection, getConnectionOptions } from 'typeorm'
import { options as optionsCommand } from 'src/commons/commandLineArgs'

import adminSeeder from './admin'

getConnectionOptions(process.env.NODE_ENV).then((options) => {
  createConnection({
    ...options,
    name: 'default',
  } as any)
    .then(async () => {
      switch (optionsCommand.type) {
        case 'admin':
          await adminSeeder()
      }

      console.log('process was completed')
      process.exit()
    })
    .catch((error) => console.log(error))
})
