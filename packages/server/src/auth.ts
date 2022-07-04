import jwt from 'jsonwebtoken'

import { User, UserModel } from './modules/user/UserModel'

const JWT_SECRET = process.env.JWT_SECRET as string

export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null }

  try {
    const decodedToken = jwt.verify(token.substring(4), JWT_SECRET)

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
  return `JWT ${jwt.sign({ id: user._id }, JWT_SECRET)}`
}
