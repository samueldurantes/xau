import { Request } from 'koa'

import { User } from './modules/user/UserModel'
import { getDataloaders } from './modules/loader/loaderRegister'
import { GraphQLContext } from './modules/graphql/types'

type ContextVars = {
  req?: Request
  user?: User | null
}

export const getContext = async (ctx: ContextVars) => {
  const dataloaders = getDataloaders()

  return {
    req: ctx.req,
    dataloaders,
    user: ctx.user,
  } as GraphQLContext
}
