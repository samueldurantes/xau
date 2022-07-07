import { DeepPartial } from '../../../../test/deepPartial'
import { Post, PostDocument, PostModel } from '../PostModel'
import { createUser } from '../../user/fixtures/createUser'

export const createPost = async (
  args?: DeepPartial<Post>,
): Promise<PostDocument> => {
  const i = Math.floor(Math.random() * 100)

  const author = await createUser()

  return new PostModel({
    title: `RandomTitle#${i}`,
    body: `RandomBody#${i}`,
    author,
    ...args,
  }).save()
}
