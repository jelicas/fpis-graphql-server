import { IResolverObject } from 'graphql-tools';
import { City } from '../../entity/City';
import { Supplier } from '../../entity/Supplier';
import { Partner } from '../../entity/Partner';
import { getManager, ConnectionManager } from 'typeorm';

export const resolvers: IResolverObject = {
  Supplier: {
    name: (root) => {
      console.log(root);
      return root.partner.name;
    },
    address: (root) => root.partner.address,
    city: (root) => root.partner.city,
  },
  Query: {
    getCities: () => City.find(),
    getSuppliers: () => Supplier.find({ relations: ['partner', 'partner.city'] }),
    getSupplier: (_, { taxIdNum }) => Supplier.findOne(taxIdNum),
  },
  Mutation: {
    addSupplier: async (_, { taxIdNum, regNum, name, address, city }) => {
      await getManager().transaction(async (transactionalEntityManager) => {
        const newCity = await City.findOne(city);
        const newPartner = await transactionalEntityManager.insert(Partner, {
          taxIdNum,
          name,
          address,
          city: newCity,
        });
        const partner = await Partner.findOne(taxIdNum);
        const newSupplier = await transactionalEntityManager.insert(Supplier, {
          taxIdNum,
          regNum,
          partner,
        });
      });
      return Supplier.findOne(taxIdNum, { relations: ['partner', 'partner.city'] });
    },
    updateSupplier: async (_, { taxIdNum, regNum, name, address, city }) => {
      await getManager().transaction(async (transactionalEntityManager) => {
        const newCity = await City.findOne(city);
        await transactionalEntityManager.update(Partner, taxIdNum, {
          name,
          address,
          city: newCity,
        });
        await transactionalEntityManager.update(Supplier, taxIdNum, { regNum });
      });
      return Supplier.findOne(taxIdNum, { relations: ['partner', 'partner.city'] });
    },
    deleteSupplier: async (_, { taxIdNum }) => {
      return getManager().transaction(async (transactionalEntityManager) => {
        console.log('here');
        const supplierStatus = await transactionalEntityManager.delete(Supplier, taxIdNum);
        if (supplierStatus.affected === 0) {
          return false;
        }
        const partnerStatus = await transactionalEntityManager.delete(Partner, taxIdNum);
        return partnerStatus.affected !== 0;
      });
    },
  },
};
