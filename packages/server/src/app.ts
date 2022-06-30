import Koa from 'koa'
import Router from 'koa-router'
import bodyparser from 'koa-bodyparser'
import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'koa-graphql'

const app = new Koa()
const router = new Router()

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const rootValue = {
  hello: () => 'Hello, World!'
}

const graphqlServer = graphqlHTTP({
  graphiql: true,
  schema,
  rootValue
})

router.all('/graphql', graphqlServer)

app.use(bodyparser())
app.use(router.routes()).use(router.allowedMethods())

export default app
