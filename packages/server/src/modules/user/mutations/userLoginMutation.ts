import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { UserModel } from '../UserModel';
import { generateJwtToken } from '../../../auth';
import { UserType } from '../UserType';

export const userLoginMutation = mutationWithClientMutationId({
  name: 'UserLogin',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ username, password }) => {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error('User not found!');
    }

    const correctPassword = await user.authenticate(password);

    if (!correctPassword) {
      throw new Error('Password is incorrect!');
    }

    const token = generateJwtToken(user._id);

    return {
      token,
      user,
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    me: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
});
