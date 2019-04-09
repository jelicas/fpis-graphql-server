import { gql } from 'apollo-server';

export const typeDefs = gql`
	type City {
		areaCode: String!
		name: String!
	}

	type Supplier {
		taxIdNum: String!
		name: String!
		address: String!
		city: City!
		regNum: String!
	}

	extend type Query {
		getCities: [City]
		getSuppliers: [Supplier]
		getSupplier(taxIdNum: String!): Supplier
	}

	extend type Mutation {
		addSupplier(taxIdNum: String!, regNum: String!, name: String!, address: String!, city: String!): Supplier
		updateSupplier(taxIdNum: String!, regNum: String!, name: String!, address: String!, city: String!): Supplier
		deleteSupplier(taxIdNum: String!): Boolean
	}
`;
