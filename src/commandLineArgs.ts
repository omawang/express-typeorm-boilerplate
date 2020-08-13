import commandLineArgs from 'command-line-args'

export const options = commandLineArgs([
  {
    name: 'env',
    alias: 'e',
    defaultValue: 'development',
    type: String,
  },
  {
    name: 'type',
    type: String,
  },
])
