import { IResolverObject } from 'graphql-tools';
import { City } from '../../entity/City';
import { Supplier } from '../../entity/Supplier';
import { Partner } from '../../entity/Partner';
import { getManager, ConnectionManager } from 'typeorm';
import { Like } from 'typeorm';

type FilterOption = 'eq' | 'startsWith' | 'contains' | 'endsWith';

const util = {
  getLikeCondition: (filterOption: FilterOption, filterValue: string) => {
    switch (filterOption) {
      case 'eq':
        return filterValue;
      case 'startsWith':
        return `${filterValue}%`;
      case 'contains':
        return `%${filterValue}%`;
      case 'endsWith':
        return `%${filterValue}`;
    }
  },
};

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

    filterSuppliers: async (_, { filter }) => {
      // let filterOptions = JSON.parse(JSON.stringify(filter));
      // console.log(filterOptions.OR);
      console.log(filter.OR);

      let res;

      if (filter.OR) {
        let query = getManager()
          .createQueryBuilder(Supplier, 's')
          .innerJoinAndSelect('s.partner', 'p')
          .innerJoinAndSelect('p.city', 'c');

        filter.OR.forEach((filterObject) => {
          console.log(filterObject); // { name: { eq: 'Hemofarm' } }
          let filterParam = Object.keys(filterObject)[0];
          let filterOption;
          switch (filterParam) {
            case 'name':
              filterOption = Object.keys(filterObject['name'])[0]; // eq, startsWith etc.
              query.orWhere('p.name like :name', {
                name: util.getLikeCondition(filterOption, filterObject['name'][filterOption]),
              });
              break;
            case 'address':
              filterOption = Object.keys(filterObject['address'])[0]; // eq, startsWith etc.
              query.orWhere('p.address like :address', {
                address: util.getLikeCondition(filterOption, filterObject['address'][filterOption]),
              });
              break;
            case 'pib':
              filterOption = Object.keys(filterObject['pib'])[0]; // eq, startsWith etc.
              query.orWhere('p.taxIdNum like :pib', {
                pib: util.getLikeCondition(filterOption, filterObject['pib'][filterOption]),
              });
              break;
          }
        });
        res = await query.getMany();
      } else {
        let query = getManager()
          .createQueryBuilder(Supplier, 's')
          .innerJoinAndSelect('s.partner', 'p');

        filter.AND.forEach((filterObject) => {
          let filterParam = Object.keys(filterObject)[0];
          let filterOption;
          switch (filterParam) {
            case 'name':
              filterOption = Object.keys(filterObject['name'])[0]; // eq, startsWith etc.
              query.andWhere('p.name like :name', {
                name: util.getLikeCondition(filterOption, filterObject['name'][filterOption]),
              });
              break;
            case 'address':
              filterOption = Object.keys(filterObject['address'])[0]; // eq, startsWith etc.
              query.andWhere('p.address like :address', {
                address: util.getLikeCondition(filterOption, filterObject['address'][filterOption]),
              });
              break;
            case 'pib':
              filterOption = Object.keys(filterObject['pib'])[0]; // eq, startsWith etc.
              query.andWhere('p.taxIdNum like :pib', {
                pib: util.getLikeCondition(filterOption, filterObject['pib'][filterOption]),
              });
              break;
          }
        });

        res = await query.getMany();
      }
      console.log();
      return res;

      //2 slucaja da li je AND ili je OR
      //da li sadrzi name, address, pib ili koju kombinaciju od po 2, dakle 3 od po 1, 3 od po 2, 1 od 3 - 7 kombinacija
    },
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
