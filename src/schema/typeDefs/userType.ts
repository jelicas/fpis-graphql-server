import { gql } from 'apollo-server';

export const typeDefs = gql`
	type User {
		id: ID!
		pid: String!
		name: String!
		surname: String!
		username: String!
		email: String!
		password: String!
		biography: String
		address: String!
		telephone: String!
		type: TypeOfEmployee
	}

	type TypeOfEmployee {
		_id: ID!
		title: String!
	}

	type Token {
		token: String!
	}

	extend type Query {
		getUser(id: ID!): User!
		signinUser(username: String!, password: String!): Token
	}

	extend type Mutation {
		addTypeOfEmployee(title: String!): TypeOfEmployee
		signupUser(
			username: String!
			email: String!
			password: String!
			pid: String!
			name: String!
			surname: String!
			biography: String
			address: String!
			telephone: String!
			type: ID!
		): Token
	}
`;
