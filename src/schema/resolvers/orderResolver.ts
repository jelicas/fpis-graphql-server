import { IResolverObject } from 'graphql-tools';
import { getManager } from 'typeorm';

import { Order } from '../../entity/Order';
import { OrderItem } from '../../entity/OrderItem';
import { ProductPerSupplier } from '../../entity/ProductPerSupplier';
import { Requisition } from '../../entity/Requisition';
import { RequisitionItem } from '../../entity/RequisitionItem';
import { Supplier } from '../../entity/Supplier';
import { User } from '../../entity/User';

const util = {
  getDateFromString(date: String) {
    var day = parseInt(date.substring(0, 2));
    var month = parseInt(date.substring(3, 5));
    var year = parseInt(date.substring(6, 10));
    var parsedDate = new Date(year, month - 1, day);
    return parsedDate;
  },
};

export const resolvers: IResolverObject = {
  Query: {
    getLastRequisition: async () => {
      let latestRequisition = await getManager()
        .createQueryBuilder(Requisition, 'r')
        .addSelect('MAX(r.date_created)')
        .groupBy('r.id')
        .getOne();
      return latestRequisition;
    },
    getRequisitionItemsPerSupplier: async (_, { requisitionId, supplierId }) => {
      let reqItems = await getManager()
        .createQueryBuilder('ProductPerSupplier', 'pps')
        .innerJoinAndSelect('pps.requisition', 'r')
        .innerJoinAndSelect('r.product', 'p')
        .innerJoinAndSelect('p.catalogItemProducts', 'cip')
        .innerJoinAndSelect('cip.catItem', 'ci')
        .innerJoinAndSelect('ci.catalog', 'c')
        .innerJoinAndSelect('c.supplier', 's')
        .andWhere('pps.requisitionId like :rid', { rid: requisitionId })
        .andWhere('pps.taxIdNum like :tin', { tin: supplierId })
        .andWhere('s.taxIdNum like :tin', { tin: supplierId })
        .getMany();

      let structuredReqItems = reqItems.map(e => {
        let el = <any>e;
        return {
          requisitionId: el.requisitionId,
          itemSerialNumber: el.itemSerialNumber,
          orderedQuantity: el.orderedQuantity,
          totalQuantity: el.orderQuantity,
          product: {
            id: el.requisition.product.id,
            name: el.requisition.product.name,
            supplierPrice: el.requisition.product.catalogItemProducts[0].catItem.price,
          },
        };
      });

      console.log(structuredReqItems);
      return structuredReqItems;
    },
  },
  Mutation: {
    createOrder: async (_, { order }) => {
      let newOrder;
      try {
        await getManager().transaction(async transactionalEntityManager => {
          let orderItems = order.orderItems;

          let totalAmount = 0;
          orderItems.forEach(e => {
            totalAmount += e.price * e.quantity;
          });

          //insert into order
          // let d: Date = util.getDateFromString(order.dateCreated);
          let employee = await User.findOne(order.employeeId);
          let supplier = await Supplier.findOne(order.taxIdNum);
          newOrder = await transactionalEntityManager.insert(Order, {
            totalAmount,
            employee,
            supplier,
          });

          let orderId = newOrder.generatedMaps[0].id;
          console.log(newOrder);
          console.log(orderId);

          let i = 1;

          let promises = [];

          orderItems.forEach(e => {
            //insert into order items
            promises.push(
              transactionalEntityManager.insert(OrderItem, {
                orderId,
                serialNumber: i,
                requisitionId: e.requisitionId,
                itemSerialNumber: e.itemSerialNumber,
                supplierId: e.supplierId,
              })
            );

            //update requisitionItem
            promises.push(
              transactionalEntityManager.update(
                RequisitionItem,
                { requisitionId: e.requisitionId, serialNumber: e.itemSerialNumber },
                {
                  orderedQuantity: e.quantity,
                }
              )
            );

            //update productPerSupplier
            promises.push(
              transactionalEntityManager.update(
                ProductPerSupplier,
                {
                  requisitionId: e.requisitionId,
                  itemSerialNumber: e.itemSerialNumber,
                  taxIdNum: e.supplierId,
                },
                {
                  orderedQuantity: e.quantity,
                  ordered: true,
                }
              )
            );
            i++;
          });
          await Promise.all(promises);
        });
      } catch (e) {
        console.log(e);
        return false;
      }
      return true;
    },
  },
};
