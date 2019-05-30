import { gql } from 'apollo-server';

export const typeDefs = gql`
  input StringOperators {
    eq: String
    contains: String
    startsWith: String
    endsWith: String
  }

  input SupplierParameters {
    name: StringOperators
    address: StringOperators
    PIB: StringOperators
  }

  input SupplierFilterParameter {
    OR: [SupplierParameters]
    AND: [SupplierParameters]
  }

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
    filterSuppliers(filter: SupplierFilterParameter): [Supplier]
  }

  extend type Mutation {
    addSupplier(
      taxIdNum: String
      regNum: String
      name: String
      address: String
      city: String
    ): Supplier
    updateSupplier(
      taxIdNum: String
      regNum: String
      name: String
      address: String
      city: String
    ): Supplier
    deleteSupplier(taxIdNum: String): Boolean
  }
`;
