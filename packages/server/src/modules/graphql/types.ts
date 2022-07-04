import mongoose from 'mongoose'

import { DataLoaders } from '../loader/loaderRegister'
import { User } from '../user/UserModel'

declare type ObjectId = mongoose.Schema.Types.ObjectId

export type GraphQLContext = {
  user?: User
  dataloaders: DataLoaders
}

export type LoaderFn = (
  ctx: GraphQLContext,
  id: string | ObjectId | object,
) => any
