import dotenv from 'dotenv'
import { options } from './commons/commandLineArgs'

// Set the env file
const result2 = dotenv.config({
  path: `./env/${options.env}.env`,
})

if (result2.error) {
  throw result2.error
}
