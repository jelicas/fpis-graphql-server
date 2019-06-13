import { gql, makeExecutableSchema } from 'apollo-server';
import { merge } from 'lodash';

import { resolvers as orderResolvers } from './resolvers/orderResolver';
import { resolvers as supplierResolvers } from './resolvers/supplierResolver';
import { resolvers as userResolvers } from './resolvers/userResolver';
import { typeDefs as orderTypeDefs } from './typeDefs/orderType';
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
  typeDefs: [typeDefs, userTypeDefs, supplierTypeDefs, orderTypeDefs],
  resolvers: merge(userResolvers, supplierResolvers, orderResolvers),
});

export default schema;
