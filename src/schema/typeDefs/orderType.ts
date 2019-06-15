import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Requisition {
    id: Int
    serialNumber: String
    dateCreated: String
  }

  type RequisitionProduct {
    id: Int
    name: String
    supplierPrice: Float
  }

  type RequisitionItem {
    requisitionId: Int
    itemSerialNumber: Int
    orderedQuantity: Int
    totalQuantity: Int
    product: RequisitionProduct
  }

  input Order {
    id: Int
    dateCreated: String
    employeeId: Int
    taxIdNum: String
    orderItems: [OrderItem]
    supplierName: String
  }

  input OrderItem {
    requisitionId: Int
    itemSerialNumber: Int
    supplierId: String
    quantity: Float
    price: Float
    discount: Float
  }

  type OrderType {
    id: Int
    dateCreated: String
    employeeId: Int
    supplier: Supplier
  }

  extend type Query {
    getLastRequisition: Requisition
    getRequisitionItemsPerSupplier(requisitionId: Int, supplierId: String): [RequisitionItem]
    getAllOrders: [OrderType]
  }

  extend type Mutation {
    createOrder(order: Order): Boolean
  }
`;
