import { DeepPartial } from '../../../../test/deepPartial'
import { User, UserDocument, UserModel } from '../UserModel'

export const createUser = async (
  args?: DeepPartial<User>,
): Promise<UserDocument> => {
  const i = Math.floor(Math.random() * 100)

  return new UserModel({
    username: `user#${i}`,
    password: `password#${i}`,
    ...args,
  }).save()
}
