import { MongoMemoryServer } from 'mongodb-memory-server'
import NodeEnvironment from 'jest-environment-node'

class MongoDbEnvironment extends NodeEnvironment {
  private mongod: MongoMemoryServer | null

  // eslint-disable-next-line no-useless-constructor
  constructor(config, context) {
    super(config, context)
  }

  async setup() {
    this.mongod = await MongoMemoryServer.create()
    this.global.__MONGO_URI__ = this.mongod.getUri()

    return super.setup()
  }

  async teardown() {
    await this.mongod?.stop()
    this.mongod = null
  }
}

export default MongoDbEnvironment
