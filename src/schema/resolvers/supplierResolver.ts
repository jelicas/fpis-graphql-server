import { IResolverObject } from 'graphql-tools';
import { getManager } from 'typeorm';

import { City } from '../../entity/City';
import { Partner } from '../../entity/Partner';
import { ProductPerSupplier } from '../../entity/ProductPerSupplier';
import { Requisition } from '../../entity/Requisition';
import { Supplier } from '../../entity/Supplier';

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
    name: root => {
      console.log('ROOT');
      console.log(root);
      if (root.partner) {
        return root.partner.name;
      } else return root.name;
    },
    address: root => {
      if (root.partner) {
        return root.partner.address;
      } else return root.address;
    },
    city: root => {
      if (root.partner) {
        return root.partner.city;
      } else return root.city;
    },
    taxIdNum: root => {
      if (root.partner) {
        return root.partner.taxIdNum;
      } else return root.taxIdNum;
    },
  },
  Query: {
    getCities: () => City.find(),
    getSuppliers: () => Supplier.find({ relations: ['partner', 'partner.city'] }),
    getSupplier: (_, { taxIdNum }) => Supplier.findOne({ where: { taxIdNum } }),

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

        filter.OR.forEach(filterObject => {
          console.log(filterObject); // { name: { eq: 'Hemofarm' } }
          let filterParam = Object.keys(filterObject)[0];
          let filterOption;
          switch (filterParam) {
            case 'name':
              filterOption = Object.keys(filterObject['name'])[0]; // eq, startsWith etc.
              query.orWhere('LOWER(p.name) like LOWER(:name)', {
                name: util.getLikeCondition(filterOption, filterObject['name'][filterOption]),
              });
              break;
            case 'address':
              filterOption = Object.keys(filterObject['address'])[0]; // eq, startsWith etc.
              query.orWhere('LOWER(p.address) like LOWER(:address)', {
                address: util.getLikeCondition(filterOption, filterObject['address'][filterOption]),
              });
              break;
            case 'pib':
              filterOption = Object.keys(filterObject['pib'])[0]; // eq, startsWith etc.
              query.orWhere('LOWER(p.taxIdNum) like LOWER(:pib)', {
                pib: util.getLikeCondition(filterOption, filterObject['pib'][filterOption]),
              });
              break;
          }
        });
        res = await query.getMany();
      } else {
        let query = getManager()
          .createQueryBuilder(Supplier, 's')
          .innerJoinAndSelect('s.partner', 'p')
          .innerJoinAndSelect('p.city', 'c');

        filter.AND.forEach(filterObject => {
          let filterParam = Object.keys(filterObject)[0];
          let filterOption;
          switch (filterParam) {
            case 'name':
              filterOption = Object.keys(filterObject['name'])[0]; // eq, startsWith etc.
              query.andWhere('LOWER(p.name) like LOWER(:name)', {
                name: util.getLikeCondition(filterOption, filterObject['name'][filterOption]),
              });
              break;
            case 'address':
              filterOption = Object.keys(filterObject['address'])[0]; // eq, startsWith etc.
              query.andWhere('LOWER(p.address) like LOWER(:address)', {
                address: util.getLikeCondition(filterOption, filterObject['address'][filterOption]),
              });
              break;
            case 'pib':
              filterOption = Object.keys(filterObject['pib'])[0]; // eq, startsWith etc.
              query.andWhere('LOWER(p.taxIdNum) like LOWER(:pib)', {
                pib: util.getLikeCondition(filterOption, filterObject['pib'][filterOption]),
              });
              break;
          }
        });

        res = await query.getMany();
      }
      return res;
    },
    getSuppliersFromLastRequisition: async () => {
      let latestRequisition = await getManager()
        .createQueryBuilder(Requisition, 'r')
        .addSelect('MAX(r.date_created)')
        .groupBy('r.id')
        .getOne();
      let latestRequisitionId = latestRequisition.id;

      let suppliers = await getManager()
        .createQueryBuilder(ProductPerSupplier, 'p')
        .innerJoinAndSelect('p.supplier', 's')
        .innerJoinAndSelect('s.partner', 'partner')
        .innerJoinAndSelect('partner.city', 'city')
        .select(
          'DISTINCT p.tax_id_num, s.reg_num, partner.name as partner_name, partner.address, city.name as city_name, city.area_code'
        )
        .where('p.requisition_id like :rid ', { rid: latestRequisitionId })
        .getRawMany();

      let requisitionSuppliers = await suppliers.map(e => ({
        taxIdNum: e.tax_id_num,
        regNum: e.reg_num,
        name: e.partner_name,
        city: { areaCode: e.area_code, name: e.city_name },
        address: e.address,
      }));

      console.log(requisitionSuppliers);

      return requisitionSuppliers;
    },
  },
  Mutation: {
    addSupplier: async (_, { taxIdNum, regNum, name, address, city }) => {
      await getManager().transaction(async transactionalEntityManager => {
        const newCity = await City.findOne(city);
        const newPartner = await transactionalEntityManager.insert(Partner, {
          taxIdNum,
          name,
          address,
          city: newCity,
        });
        // const partner = await Partner.findOne(taxIdNum);
        const newSupplier = await transactionalEntityManager.insert(Supplier, {
          taxIdNum,
          regNum,
        });
      });
      return Supplier.findOne(taxIdNum, { relations: ['partner', 'partner.city'] });
    },
    updateSupplier: async (_, { taxIdNum, regNum, name, address, city }) => {
      await getManager().transaction(async transactionalEntityManager => {
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
      return getManager().transaction(async transactionalEntityManager => {
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
