import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { UserModel } from '../UserModel';
import { generateJwtToken } from '../../../auth';
import { UserType } from '../UserType';

export const userRegisterMutation = mutationWithClientMutationId({
  name: 'UserRegister',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  mutateAndGetPayload: async ({ username, ...rest }) => {
    const hasUser = (await UserModel.countDocuments({ username })) > 0;

    if (hasUser) {
      throw new Error('This username is already used');
    }

    // WARN: idk
    const user = new UserModel({ username, ...rest });

    await user.save();

    const token = generateJwtToken(user);

    return {
      id: user._id,
      sucess: 'Successfully registered!',
      token
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token
    },
    me: {
      type: UserType,
      resolve: async ({ id }) => await UserModel.findById(id)
    }
  }
});
