import Koa, { Request, Response, Context } from 'koa'
import Router from 'koa-router'
import bodyparser from 'koa-bodyparser'
import { graphqlHTTP, OptionsData } from 'koa-graphql'
import cors from '@koa/cors'

import { getUser } from './auth'
import { getContext } from './getContext'
import { schema } from './schemas/schema'

const app = new Koa()
const router = new Router()

const graphQlSettingsPerReq = async (
  _req: Request,
  _res: Response,
  ctx: Context,
): Promise<OptionsData> => {
  const { user } = await getUser(ctx.cookies.get('auth.token'))

  return {
    graphiql: true,
    schema,
    pretty: true,
    context: await getContext({ user }),
    customFormatErrorFn: ({ message, locations, stack }) => {
      console.log(message)
      console.log(locations)
      console.log(stack)

      return {
        message,
        locations,
        stack,
      }
    },
  }
}

const graphqlServer = graphqlHTTP(graphQlSettingsPerReq)

router.all('/graphql', graphqlServer)

app.use(cors({ credentials: true }))
app.use(bodyparser())
app.use(router.routes()).use(router.allowedMethods())

export default app
