import { printSchema } from 'graphql/utilities'
import fs from 'fs/promises'
import path from 'path'

import { schema } from '../src/schemas/schema'

const generateSchema = async () => {
  const printedSchema = printSchema(schema)

  const directory = path.join(
    __dirname,
    '..',
    '..',
    'web',
    'data',
    'schema.gql',
  )

  await fs.writeFile(directory, printedSchema)
}

generateSchema()
