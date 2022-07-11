import jwt from 'jsonwebtoken'

import { User, UserModel } from './modules/user/UserModel'
import { config } from './environment'

export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null }

  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET)

    const user = await UserModel.findOne({
      _id: (decodedToken as { id: string }).id,
    })

    return {
      user,
    }
  } catch (err) {
    return { user: null }
  }
}

export const generateJwtToken = (user: User) => {
  return jwt.sign({ id: user._id }, config.JWT_SECRET)
}
