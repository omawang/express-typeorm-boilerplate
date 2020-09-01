import 'reflect-metadata' // Must be the first import
import './loadEnv'
import { createConnection, getConnectionOptions } from 'typeorm'
import app from './server'
import logger from './helpers/logger'

// Start the server
const port = Number(process.env.PORT || 3000)
getConnectionOptions(process.env.NODE_ENV).then((options) => {
  createConnection({
    ...options,
    name: 'default',
  } as any)
    .then(async (connection) => {
      app.listen(port, () => {
        logger.info('Express server started on port: ' + port)
      })
    })
    .catch((error) => console.log(error))
})
