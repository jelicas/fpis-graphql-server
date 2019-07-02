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

  type OrderItemType {
    orderId: Int
    serialNumber: Int
    requisitionId: Int
    itemSerialNumber: Int
    supplierId: String
    orderedQuantity: Float
    totalQuantity: Float
    product: RequisitionProduct
  }

  type OrderType {
    id: Int
    dateCreated: String
    employee: User
    supplier: Supplier
    totalAmount: Float
    orderItems: [OrderItemType]
  }

  extend type Query {
    getLastRequisition: Requisition
    getRequisitionItemsPerSupplier(requisitionId: Int, supplierId: String): [RequisitionItem]
    getAllOrders: [OrderType]
    getOrder(orderId: Int): OrderType
  }

  extend type Mutation {
    createOrder(order: Order): Boolean
    editOrder(order: Order): Boolean
  }
`;
