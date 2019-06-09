import { gql, makeExecutableSchema } from 'apollo-server';
import { merge } from 'lodash';

import { resolvers as supplierResolvers } from './resolvers/supplierResolver';
import { resolvers as userResolvers } from './resolvers/userResolver';
import { typeDefs as supplierTypeDefs } from './typeDefs/supplierType';
import { typeDefs as userTypeDefs } from './typeDefs/userType';

const typeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, userTypeDefs, supplierTypeDefs],
  resolvers: merge(userResolvers, supplierResolvers),
});

export default schema;
