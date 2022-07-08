import { printSchema } from 'graphql/utilities'
import { promises } from 'fs'
import path from 'path'

import { schema } from '../src/schemas/schema'

const a = printSchema(schema)

;(async () => {
  const directory = path.join(
    __dirname,
    '..',
    '..',
    'web',
    'data',
    'schema.gql',
  )

  await promises.writeFile(directory, a)
})()
